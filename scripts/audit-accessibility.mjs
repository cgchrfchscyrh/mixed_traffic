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
      (await page.locator("video[autoplay],video[loop],iframe").count()) === 0,
      route + ": no autoplay, loops, or third-party players",
    );
    check(
      (await page.locator("footer").innerText()).includes(
        "do not represent the official views or policies",
      ),
      route + ": institutional disclaimer is present",
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
          "Home key selects first result tab",
        );
        await page.keyboard.press("End");
        check(
          await page.locator("#panel-50").isVisible(),
          "End key selects last result tab",
        );
        await page.keyboard.press("ArrowRight");
      }
      const heroVideos = page.locator("#context-video, #simulation-video");
      const heroToggle = page.locator("#hero-playback-toggle");
      const viewToggle = page.locator("#hero-view-toggle");
      check(
        (await page.locator("video").count()) === 2 &&
          (await heroVideos.count()) === 2,
        "Waymo context and research simulation videos are both present",
      );
      check(
        await heroVideos.evaluateAll((videos) =>
          videos.every((v) => v.paused && v.currentTime === 0),
        ),
        "Both title videos are paused on initial load",
      );
      check(
        await heroVideos.evaluateAll((videos) =>
          videos.every((v) => v.muted && v.controls && v.playsInline),
        ),
        "Both title videos are muted, inline, and retain native controls",
      );
      check(
        await heroVideos.evaluateAll((videos) =>
          videos.every((v) => {
            const describedBy = v
              .getAttribute("aria-describedby")
              ?.split(/\s+/);
            return (
              Boolean(v.getAttribute("aria-label")) &&
              describedBy?.length > 0 &&
              describedBy.every((id) =>
                document.getElementById(id)?.textContent.trim(),
              )
            );
          }),
        ),
        "Both videos have accessible names and existing text-description targets",
      );
      await heroToggle.focus();
      check(
        await heroToggle.evaluate(
          (el) => getComputedStyle(el).outlineStyle !== "none",
        ),
        "Combined playback control has a visible keyboard focus outline",
      );
      await page.keyboard.press("Enter");
      await page.waitForFunction(
        () =>
          [
            ...document.querySelectorAll("#context-video, #simulation-video"),
          ].every((v) => !v.paused && v.currentTime > 0.2) &&
          !document
            .querySelector("#hero-playback-toggle")
            .hasAttribute("aria-busy"),
        {},
        { timeout: 30000 },
      );
      check(
        (await heroToggle.innerText()) === "Pause clips",
        "Keyboard starts both title videos and exposes pause",
      );
      await page.keyboard.press("Space");
      check(
        await heroVideos.evaluateAll((videos) => videos.every((v) => v.paused)),
        "Keyboard pauses both title videos together",
      );
      await page.locator("#context-video").evaluate((v) => v.play());
      await page.waitForFunction(
        () =>
          document.querySelector("#hero-playback-toggle").textContent.trim() ===
          "Pause clips",
      );
      check(
        await page.locator("#simulation-video").evaluate((v) => v.paused),
        "Native playback updates the group control without starting the other video",
      );
      await page.locator("#context-video").evaluate((v) => {
        if (v instanceof HTMLVideoElement) v.pause();
      });
      await page.waitForFunction(
        () =>
          document.querySelector("#hero-playback-toggle").textContent.trim() ===
          "Play both clips",
      );
      check(
        true,
        "Native pause keeps the combined playback label synchronized",
      );
      await viewToggle.focus();
      await page.keyboard.press("Enter");
      check(
        (await viewToggle.getAttribute("aria-pressed")) === "true" &&
          (await viewToggle.innerText()) === "Restore title overlay" &&
          (await page
            .locator("#hero-stage")
            .evaluate((el) => el.classList.contains("full-frames"))),
        "Keyboard activates full-frame mode with an accurate pressed state and label",
      );
      check(
        await heroVideos.evaluateAll((videos) =>
          videos.every((v) => getComputedStyle(v).objectFit === "contain"),
        ),
        "Full-frame mode shows both complete video frames",
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
        "Full-frame mode places both videos below the title text",
      );
      await page.keyboard.press("Space");
      check(
        (await viewToggle.getAttribute("aria-pressed")) === "false" &&
          (await viewToggle.innerText()) === "Show full video frames" &&
          !(await page
            .locator("#hero-stage")
            .evaluate((el) => el.classList.contains("full-frames"))),
        "Keyboard restores the title overlay and unpressed state",
      );
      for (const id of ["context-video", "simulation-video"]) {
        const video = page.locator("#" + id);
        await page.waitForFunction((videoId) => {
          const v = document.getElementById(videoId);
          return (
            v.readyState >= 1 && Number.isFinite(v.duration) && v.duration > 0
          );
        }, id);
        check(
          true,
          id + ": finite positive duration is available from media metadata",
        );
        await video.evaluate((v) => {
          v.textTracks[0].mode = "hidden";
        });
        await page.waitForFunction(
          (videoId) =>
            document.getElementById(videoId).textTracks[0]?.cues?.length > 0,
          id,
        );
        check(
          await video.evaluate((v) => v.textTracks[0].kind === "descriptions"),
          id + ": timed visual-description track loads",
        );
      }
      await heroVideos.evaluateAll((videos) => {
        videos.forEach((v) => {
          v.currentTime = v.duration - 0.3;
        });
      });
      await heroToggle.click();
      await page.waitForFunction(() =>
        [
          ...document.querySelectorAll("#context-video, #simulation-video"),
        ].every((v) => v.ended),
      );
      check(
        (await heroToggle.innerText()) === "Replay both clips",
        "Both videos end without looping and expose replay",
      );
      await heroToggle.click();
      await page.waitForFunction(
        () =>
          [
            ...document.querySelectorAll("#context-video, #simulation-video"),
          ].every((v) => !v.paused && v.currentTime > 0 && v.currentTime < 2) &&
          !document
            .querySelector("#hero-playback-toggle")
            .hasAttribute("aria-busy"),
      );
      check(true, "Replay restarts both title videos from the beginning");
      await heroToggle.click();
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
    (await n.locator("#hero-playback-toggle").isHidden()) &&
      (await n.locator("#hero-view-toggle").isHidden()),
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
  await reduced.close();
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
