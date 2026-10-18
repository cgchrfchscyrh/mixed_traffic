# MIXED TRAFFIC — 论文项目网页

论文：**Large-Scale Mixed-Traffic and Intersection Control using Multi-agent Reinforcement Learning**。以作者提供的正式发表 PDF 为事实来源；2026 年 10 月 11 日修订参考 `Proposal_defense_narrow.pptx` 第 15–23 页的地面交通部分组织叙事。原始 PDF 和 PPT 均保持不变，不在仓库中整份重新分发。

网站地址：<https://cgchrfchscyrh.github.io/mixed_traffic/>。科研代码仓库与本网页仓库分开：<https://github.com/cgchrfchscyrh/MixedTrafficControl_IROS>。

## 网站内容

- `/`：标题和作者位于真实道路与 SUMO 仿真双视频之前，正文采用 Abstract → Method → Results → Citation 四段简洁结构。
- `/paper/`：兼容旧链接，指向首页 Method。
- `/results/`：兼容旧链接，指向首页 Results；不再展示数值结果表。
- `/accessibility/`：无障碍说明、媒体来源、附件限制和联系信息。
- `/404.html`：保留导航的错误页面。

中性炭黑和灰白界面不使用 UF 标志或蓝橙主题。按最新要求不渲染机构介绍或免责声明。原论文图的科学配色保持不变，另提供完整文字说明。

新增 PPT 第 18 页的方法图和第 19 页的 S/U 路口示意：S 为信号控制路口，U 为由机器人车辆调控的无信号路口。所有新增图均配有 alt text 和完整 HTML 文字说明，并标注来源页码。科学图示自身的原配色不作为网页 UI 的 UF 品牌配色；阅读图示不应只依靠颜色。PPT 仅用于地面交通研究内容，不公开整份答辩材料；量化结果以发表论文为准。

本轮首屏左侧保留约 20 秒 Waymo 实景片段，右侧使用用户提供的 `Videos/mixed_traffic/TL_medium.mp4` 中 00:24–00:46 的连续 22 秒 SUMO 录屏，以 1080p 和录制原速呈现，移除原文件的数字静音音轨。文件名不能证明具体控制策略或 RV 占比，网页不据此标注该片段为学习策略结果。

标题位于完整双视频画面之前；不超过 700 CSS 像素时两个画面纵向排列。视频静音自动播放并循环，提供原生播放/暂停控件，不再显示独立全局按钮。减少动态或节流偏好会禁用自动播放，手动暂停后不会因滚动返回而恢复；离开视口或隐藏标签时暂停。完整 HTML 画面说明和 WebVTT 描述轨道仍保留。关闭 JavaScript 后视频保持静止，可使用原生播放器。

## 本地运行与检查

需要 Node.js 24。使用项目自带的锁定文件安装。

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run audit:security
BASE_PATH=/mixed_traffic SITE_URL=https://cgchrfchscyrh.github.io npm run build
BASE_PATH=/mixed_traffic npm run preview -- --host 127.0.0.1 --port 4332
```

在另一终端运行：

```sh
npx playwright install chromium
TEST_URL=http://127.0.0.1:4332/mixed_traffic npm run test:a11y
```

也可以用 `CHROME_PATH` 指定已安装的 Chrome。无障碍测试包括 axe、键盘跳转/原生视频控制、320 像素回流、文字间距、无 JavaScript 页面、媒体描述轨道和引用复制。详细记录见 [ACCESSIBILITY.md](ACCESSIBILITY.md)。

本轮内容精简已通过 lint、Astro/TypeScript 构建、11 次 axe 扫描和 188 项功能检查，零违规、零检查错误。新增三个不重叠的 SUMO 正文短片，分布于 Abstract、Method 和 Results，均标明来自同一录屏且不构成控制器效果验证。网页移除独立播放/暂停按钮、研究指南入口、数值统计及结果表；完整媒体和方法图说明保留在可展开区域。详见 [ACCESSIBILITY.md](ACCESSIBILITY.md)。

## 修改内容

- `src/data/site.json`：论文题目、作者、图表说明、数值与 BibTeX。
- `src/data/narrative.json`：来自地面交通 PPT 的七段叙事；精确结果继续取自论文。
- `src/data/presentation.json`：新增图示、alt text、长说明、页码与提取记录。
- `src/data/hero-media.json`：首屏仿真片段、来源和完整画面说明。
- `src/components/` 和 `src/pages/`：布局和交互。
- `src/styles/global.css`：响应式样式、可见焦点、打印与 reduced-motion 支持。
- `public/figures/`：原论文图与答辩地面交通部分的图示阅读副本。
- `public/data/`：保留的原始研究 CSV，不在精简网页中展示数值表。
- `public/media/`：静音片段、封面及英文画面描述 VTT。
- `reports/source-provenance.json`：原 PDF 文件名、SHA-256、提取来源和核对日期。

论文数字使用原表数值，未复用与数值不一致的百分比表述。缺失的训练轨迹数据没有从图片猜测或补造。网站是研究概要，不是发表论文的完整替代版本；原始 PDF 未加标签及外部 PDF 阅读顺序等限制仍须如实说明。

## GitHub Pages

`.github/workflows/astro.yml` 在推送 `main` 后执行安装、审计、lint、构建和 axe 检查，再部署 `dist/`。仓库 Settings → Pages → Build and deployment 的 Source 使用 **GitHub Actions**。构建使用仓库名作为 `base`，所有资源通过统一的路径函数生成。

```sh
git add src public scripts package.json package-lock.json README.md ACCESSIBILITY.md SECURITY.md .github astro.config.ts eslint.config.mjs prettier.config.ts
git commit -m "Update research website"
git push origin main
```

分享给导师时发送网站地址；GitHub 仓库地址适合查看源码。GitHub Pages 是公开发布，不是私密审稿空间。

## 素材与规范

视频来源：[Waymo 官方媒体素材库](https://waymo.com/media-resources/)，使用其允许新闻及教育用途的洛杉矶自动驾驶实景素材，标注 “Source: Waymo”。选取原视频 01:08–01:28，制作约 20 秒静音片段，并提供完整文字说明及 VTT 画面描述；采用上述可暂停且尊重减少动态偏好的静音播放机制。该片段用于现实背景，不是论文控制器的实车验证。

SUMO 片段来自用户提供的 `TL_medium.mp4`，选取 00:24–00:46 的连续录屏，保留原始画面和录制速度，仅转换网页播放格式并去除音轨。原始文件保持不变。录屏展示仿真场景；它本身不确证运行的控制策略、RV 占比或量化性能，不能替代论文结果表格。

参考：[UF Web Standards](https://brandcenter.ufl.edu/web-standards/)、[UF EIT Accessibility Policy](https://policy.ufl.edu/policy/electronic-information-technology-and-communication-accessibility-policy/)。中性视觉不代表已获得 UF 官方品牌批准。自动化检查也不代表 ADA 或完整 WCAG 认证。

基于 Roman Hauksson 的 [Academic Project Astro Template](https://github.com/RomanHauksson/academic-project-astro-template)，按本研究内容重新实现。已上线的 HOIST 网站由另一个仓库维护。

## Visual revision — 18 October 2026

The overview now emphasizes the original videos and figures with concise academic headings. Complete figure and media descriptions remain in disclosures; retired paper/results routes point back to the homepage. Numerical result displays have been removed. Videos autoplay silently while visible, with native player controls and reduced-motion/data-saving protections. Affiliations and the institutional footer disclaimer are no longer rendered, per the latest user request. The research metadata, paper values and attachments remain unchanged.
