import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const site = JSON.parse(
  await readFile(new URL("../src/data/site.json", import.meta.url), "utf8"),
);
const base = (process.env.TEST_URL || "http://127.0.0.1:4332").replace(
  /\/$/,
  "",
);
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
const report = {
  date: new Date().toISOString(),
  project: site.id,
  target: "WCAG 2.1 A/AA",
  engine: "axe-core via Playwright",
  scans: [],
  checks: [],
  errors: [],
  limitations: [
    "Automated checks are not a complete WCAG or ADA certification.",
    "External full-text PDFs, screen-reader usability, scientific image contrast, and institutional approval need separate review.",
  ],
};
const check = (value, message) => {
  if (value) report.checks.push(message);
  else report.errors.push(message);
};
page.on("pageerror", (e) => report.errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") report.errors.push(m.text());
});
page.on("requestfailed", (r) => {
  if (!r.failure()?.errorText.includes("ERR_ABORTED"))
    report.errors.push(r.url() + ": " + r.failure()?.errorText);
});
async function scan(name) {
  const r = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  report.scans.push({
    name,
    passes: r.passes.length,
    violations: r.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        reason: n.failureSummary,
      })),
    })),
    incomplete: r.incomplete.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
}
try {
  for (const route of [
    "/",
    "/paper/",
    "/results/",
    "/accessibility/",
    "/404.html",
  ]) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    check(response?.ok() || route === "/404.html", route + ": page loads");
    check((await page.locator("h1").count()) === 1, route + ": one H1");
    check(
      (await page.locator("html").getAttribute("lang")) === "en",
      route + ": English language declared",
    );
    check(
      (await page.locator('img:not([alt]), img[alt=""]').count()) === 0,
      route + ": informative images have nonempty alternatives",
    );
    check(
      (await page.locator("video[autoplay],iframe").count()) === 0,
      route + ": no unconditional HTML autoplay or third-party players",
    );
    check(
      !/\bUF\b|University of Florida|official views or policies/.test(
        await page.locator("body").innerText(),
      ),
      route + ": no visible institutional introduction or disclaimer",
    );
    check(
      await page.evaluate(() => {
        const ids = Array.from(document.querySelectorAll("[id]"), (e) => e.id);
        return ids.length === new Set(ids).size;
      }),
      route + ": IDs are unique",
    );
    check(
      await page.evaluate(() => {
        let prev = 0;
        return Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6"))
          .filter((el) => el.getClientRects().length)
          .every((el) => {
            const level = Number(el.tagName[1]);
            const good = level <= prev + 1;
            prev = level;
            return good;
          });
      }),
      route + ": visible headings do not skip levels",
    );
    check(
      await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href^="#"]')).every((el) =>
          document.getElementById(el.getAttribute("href").slice(1)),
        ),
      ),
      route + ": in-page links have targets",
    );
    await page.keyboard.press("Tab");
    check(
      (await page.locator(":focus").getAttribute("class")) === "skip-link",
      route + ": skip link is first keyboard stop",
    );
    check(
      await page
        .locator(":focus")
        .evaluate((el) => getComputedStyle(el).outlineStyle !== "none"),
      route + ": keyboard focus has visible outline",
    );
    await page.keyboard.press("Enter");
    check(
      (await page.locator(":focus").getAttribute("id")) === "main",
      route + ": skip link focuses main",
    );
    await scan(route + " desktop");
    if (route === "/") {
      const heroVideos = page.locator("#context-video, #simulation-video");
      const heroToggle = page.locator("#hero-playback-toggle");
      const mediaArea = page.locator(".hero-backdrops");
      const playing = () =>
        page.waitForFunction(
          () =>
            [...document.querySelectorAll("video")].every(
              (v) => !v.paused && v.currentTime > 0.1,
            ) &&
            !document
              .querySelector("#hero-playback-toggle")
              .hasAttribute("aria-busy"),
          {},
          { timeout: 30000 },
        );
      check(
        (await heroVideos.count()) === 2,
        "Both research-context videos are present",
      );
      check(
        await heroVideos.evaluateAll((videos) =>
          videos.every((v) => v.muted && v.controls && v.playsInline && v.loop),
        ),
        "Automatic videos are muted, inline, looped, and retain native controls",
      );
      check(
        await heroVideos.evaluateAll((videos) =>
          videos.every((v) => {
            const ids = v.getAttribute("aria-describedby")?.split(/\s+/);
            return (
              v.getAttribute("aria-label") &&
              ids?.length &&
              ids.every((id) => document.getElementById(id)?.textContent.trim())
            );
          }),
        ),
        "Both videos have names and complete text alternatives",
      );
      await mediaArea.scrollIntoViewIfNeeded();
      await playing();
      check(
        (await heroToggle.innerText()) === "Pause videos",
        "Visible videos autoplay and expose a clear pause control",
      );
      await heroToggle.focus();
      check(
        await heroToggle.evaluate(
          (el) => getComputedStyle(el).outlineStyle !== "none",
        ),
        "Playback control has a visible keyboard focus outline",
      );
      await page.keyboard.press("Enter");
      check(
        await heroVideos.evaluateAll((videos) => videos.every((v) => v.paused)),
        "Keyboard pauses both autoplaying videos",
      );
      const pausedTimes = await heroVideos.evaluateAll((videos) =>
        videos.map((v) => v.currentTime),
      );
      await page.locator("#citation").scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await mediaArea.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      check(
        await heroVideos.evaluateAll(
          (videos, times) =>
            videos.every((v, i) => v.paused && v.currentTime === times[i]),
          pausedTimes,
        ),
        "Manual pause survives scrolling away and returning",
      );
      await heroToggle.focus();
      await page.keyboard.press("Space");
      await playing();
      check(true, "Keyboard explicitly resumes both paused videos");
      await heroVideos.evaluateAll((videos) =>
        videos.forEach((v) => {
          if (v instanceof HTMLVideoElement) v.pause();
        }),
      );
      await page.waitForFunction(
        () =>
          document.querySelector("#hero-playback-toggle").textContent.trim() ===
          "Play videos",
      );
      check(true, "Native pause synchronizes the shared control");
      await page.locator("#citation").scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await mediaArea.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      check(
        await heroVideos.evaluateAll((videos) => videos.every((v) => v.paused)),
        "Native manual pause also prevents automatic restart",
      );
      for (const id of ["context-video", "simulation-video"]) {
        await page.locator("#" + id).evaluate((v) => {
          v.textTracks[0].mode = "hidden";
        });
        await page.waitForFunction(
          (id) => document.getElementById(id).textTracks[0]?.cues?.length > 0,
          id,
        );
        check(
          await page
            .locator("#" + id)
            .evaluate(
              (v) =>
                v.textTracks[0].kind === "descriptions" &&
                Number.isFinite(v.duration) &&
                v.duration > 0,
            ),
          id + ": metadata and timed visual descriptions load",
        );
      }
      check(
        await heroVideos.evaluateAll((videos) =>
          videos.every((v) => getComputedStyle(v).objectFit === "contain"),
        ),
        "Both videos always show complete frames",
      );
      check(
        await page.evaluate(
          () =>
            document.querySelector(".hero-backdrops").getBoundingClientRect()
              .top >=
            document.querySelector(".hero-text").getBoundingClientRect()
              .bottom -
              1,
        ),
        "Title sits above the media without obscuring it",
      );
      // A fresh visit has no manual-pause preference: offscreen playback pauses and re-entry resumes.
      await page.reload({ waitUntil: "networkidle" });
      await mediaArea.scrollIntoViewIfNeeded();
      await playing();
      await page.locator("#citation").scrollIntoViewIfNeeded();
      await page.waitForFunction(() =>
        [...document.querySelectorAll("video")].every((v) => v.paused),
      );
      check(true, "Videos pause when scrolled out of view");
      await mediaArea.scrollIntoViewIfNeeded();
      await playing();
      check(
        true,
        "Automatic playback resumes on re-entry when the user has not paused",
      );
      await heroVideos.evaluateAll((videos) =>
        videos.forEach((v) => {
          v.currentTime = v.duration - 0.25;
        }),
      );
      await page.waitForFunction(() =>
        [...document.querySelectorAll("video")].every(
          (v) => !v.paused && v.currentTime < 2,
        ),
      );
      await heroToggle.click();
      check(
        await heroVideos.evaluateAll((videos) => videos.every((v) => v.paused)),
        "Looping playback can still be stopped immediately",
      );
      await page.locator("#comparison-details > summary").click();
      if (site.comparisons.length > 1) {
        await page.getByRole("tab").first().focus();
        await page.keyboard.press("ArrowRight");
        check(
          await page.locator("#panel-50").isVisible(),
          "Result tabs support arrow-key navigation",
        );
        await scan("50% results selected");
        await page.keyboard.press("Home");
        check(
          await page.locator("#panel-80").isVisible(),
          "Home selects the first result tab",
        );
        await page.keyboard.press("End");
        check(
          await page.locator("#panel-50").isVisible(),
          "End selects the last result tab",
        );
        await page.keyboard.press("ArrowRight");
      }
      await page.locator("#media-descriptions > summary").focus();
      await page.keyboard.press("Enter");
      check(
        (await page.locator("#context-visual-description").isVisible()) &&
          (await page.locator("#simulation-visual-description").isVisible()),
        "Media descriptions expand by keyboard",
      );
      await page.keyboard.press("Enter");
      await page
        .getByRole("button", { name: "Copy citation", exact: true })
        .focus();
      await page.keyboard.press("Enter");
      check(
        (await page.evaluate(() => navigator.clipboard.readText())).includes(
          site.citationKey,
        ),
        "Citation can be copied with keyboard",
      );
    }
    if (route === "/results/") {
      check(
        (await page.locator("table").count()) === site.tables.length,
        "All expected result tables are present",
      );
      check(
        (await page.locator("table caption").count()) === site.tables.length,
        "All tables have descriptive captions",
      );
      check(
        (await page.locator("th:not([scope])").count()) === 0,
        "Table headers define their scope",
      );
    }
    for (const width of [320, 768]) {
      await page.setViewportSize({ width, height: 900 });
      check(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route + `: no page-level horizontal overflow at ${width} CSS px`,
      );
      if (route === "/") {
        check(
          await page.evaluate(
            () =>
              document.querySelector(".hero-backdrops").getBoundingClientRect()
                .top >=
              document.querySelector(".hero-text").getBoundingClientRect()
                .bottom -
                1,
          ),
          `Homepage places title text above the videos at ${width} CSS px`,
        );
        check(
          await page
            .locator("#context-video, #simulation-video")
            .evaluateAll((videos) =>
              videos.every((v) => getComputedStyle(v).objectFit === "contain"),
            ),
          `Homepage shows complete video frames at ${width} CSS px`,
        );
        if (width === 320)
          check(
            await page.evaluate(
              () =>
                document
                  .querySelector("#simulation-video")
                  .getBoundingClientRect().top >=
                document.querySelector("#context-video").getBoundingClientRect()
                  .bottom -
                  1,
            ),
            "Homepage stacks both videos vertically at 320 CSS px",
          );
      }
    }
    await page.setViewportSize({ width: 320, height: 900 });
    const spacing = await page.addStyleTag({
      content:
        "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}",
    });
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route + ": reflows at 320 CSS px with increased text spacing",
    );
    await spacing.evaluate((el) => el.remove());
    await page.setViewportSize({ width: 390, height: 900 });
    await scan(route + " mobile");
    if (route === "/results/") {
      const table = page.locator(".table-scroll").first();
      await table.focus();
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(200);
      check(
        await table.evaluate((el) => el.scrollLeft > 0),
        "Wide result table supports keyboard horizontal scrolling",
      );
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  const nojs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 900 },
  });
  const n = await nojs.newPage();
  await n.goto(base + "/");
  await n.locator("#comparison-details > summary").click();
  for (const d of site.comparisons)
    check(
      await n.locator("#panel-" + d.id).isVisible(),
      "Comparison " + d.label + " remains visible without JavaScript",
    );
  check(
    (await n.locator("video[controls]").count()) === 2,
    "Both native video controls remain available without JavaScript",
  );
  check(
    await n.locator("#hero-playback-toggle").isHidden(),
    "Unavailable JavaScript media controls are hidden without JavaScript",
  );
  check(
    await n.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    "Homepage reflows at 320 CSS px without JavaScript",
  );
  check(
    (await n.locator("#citation-text").innerText()).includes(site.citationKey),
    "Citation remains readable without JavaScript",
  );
  check(
    await n.locator("#copy-citation").isHidden(),
    "Unavailable JavaScript copy control is hidden",
  );
  await nojs.close();
  const reduced = await browser.newContext({ reducedMotion: "reduce" });
  const rp = await reduced.newPage();
  await rp.goto(base + "/");
  check(
    await rp
      .locator("video")
      .evaluateAll(
        (videos) =>
          videos.length === 2 &&
          videos.every((v) => v.paused && v.currentTime === 0),
      ),
    "Reduced-motion visit does not start either title video",
  );
  await rp.locator("#hero-playback-toggle").click();
  await rp.waitForFunction(() =>
    [...document.querySelectorAll("video")].every((v) => !v.paused),
  );
  check(true, "Reduced-motion users can explicitly choose playback");
  await rp.locator("#hero-playback-toggle").click();
  await reduced.close();
  const saved = await browser.newContext();
  await saved.addInitScript(() => {
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: true, addEventListener() {} },
    });
  });
  const sp = await saved.newPage();
  await sp.goto(base + "/", { waitUntil: "networkidle" });
  await sp.locator(".hero-backdrops").scrollIntoViewIfNeeded();
  await sp.waitForTimeout(250);
  check(
    await sp
      .locator("video")
      .evaluateAll((videos) =>
        videos.every((v) => v.paused && v.currentTime === 0),
      ),
    "Data-saving preference prevents autoplay",
  );
  await saved.close();
} catch (e) {
  report.errors.push(e.stack || String(e));
} finally {
  await browser.close();
  await mkdir("reports", { recursive: true });
  await writeFile(
    "reports/axe-wcag21aa.json",
    JSON.stringify(report, null, 2) + "\n",
  );
}
const violations = report.scans.reduce((n, s) => n + s.violations.length, 0);
console.log(
  JSON.stringify(
    {
      project: site.id,
      scans: report.scans.length,
      checks: report.checks.length,
      violations,
      errors: report.errors,
    },
    null,
    2,
  ),
);
assert.equal(
  violations,
  0,
  "axe violations found; see reports/axe-wcag21aa.json",
);
assert.equal(
  report.errors.length,
  0,
  "Functional or accessibility checks failed; see report",
);
