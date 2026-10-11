# MIXED TRAFFIC — 论文项目网页

论文：**Large-Scale Mixed-Traffic and Intersection Control using Multi-agent Reinforcement Learning**。以作者提供的正式发表 PDF 为事实来源；2026 年 10 月 11 日修订参考 `Proposal_defense_narrow.pptx` 第 15–23 页的地面交通部分组织叙事。原始 PDF 和 PPT 均保持不变，不在仓库中整份重新分发。

网站地址：<https://cgchrfchscyrh.github.io/mixed_traffic/>。科研代码仓库与本网页仓库分开：<https://github.com/cgchrfchscyrh/MixedTrafficControl_IROS>。

## 网站内容

- `/`：标题叠在左右并列的真实道路与 SUMO 仿真视频之上，以及 problem → existing work → knowledge gap → method → experiments → results → conclusion and limitations 七段研究结构。
- `/paper/`：HTML 研究指南，明确是论文的阅读辅助，不是完整逐字转录。
- `/results/`：原始图、详细文字说明、结果表格及 CSV 下载。
- `/accessibility/`：无障碍说明、媒体来源、附件限制和联系信息。
- `/404.html`：保留导航与 UF 非官方立场声明的错误页面。

中性炭黑和灰白界面不使用 UF 标志或蓝橙主题。保留论文作者单位和所有页面的 UF 非官方立场声明。原论文图的科学配色保持不变，另提供文字和表格说明。

新增 PPT 第 18 页的方法图和第 19 页的 S/U 路口示意：S 为信号控制路口，U 为由机器人车辆调控的无信号路口。所有新增图均配有 alt text 和完整 HTML 文字说明，并标注来源页码。科学图示自身的原配色不作为网页 UI 的 UF 品牌配色；阅读图示不应只依靠颜色。PPT 仅用于地面交通研究内容，不公开整份答辩材料；量化结果仍以发表论文及已核对表格为准。

本轮首屏左侧保留约 20 秒 Waymo 实景片段，右侧使用用户提供的 `Videos/mixed_traffic/TL_medium.mp4` 中 00:24–00:46 的连续 22 秒 SUMO 录屏，以 1080p 和录制原速呈现，移除原文件的数字静音音轨。文件名不能证明具体控制策略或 RV 占比，网页不据此标注该片段为学习策略结果。

桌面端提供同时播放、暂停、重播两个视频的控件，以及 “Show full video frames” 切换按钮。宽度不超过 1000 CSS 像素时标题位于视频前方；不超过 700 CSS 像素时两个完整视频画面纵向排列。两个播放器始终保留原生控件，不自动播放或循环；两段视频均有完整 HTML 画面说明和 WebVTT 描述轨道。关闭 JavaScript 后仍可使用原生播放器。

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

也可以用 `CHROME_PATH` 指定已安装的 Chrome。无障碍测试包括 axe、键盘跳转/标签页/视频控制、320 像素回流、文字间距、无 JavaScript 页面、媒体描述轨道和引用复制。详细记录见 [ACCESSIBILITY.md](ACCESSIBILITY.md)。

2026 年 10 月 11 日已移除未使用的 Markdown 检查器及其受影响的 KaTeX 依赖，依赖审计为零漏洞；保留包版本未变，`http-cache-semantics` 仍为修复版 4.3.0。`audit:security` 不使用公告例外，会阻止存在漏洞或审计失败的部署。此前 PPT 叙事版本已通过 lint、Astro/TypeScript 构建、11 次 axe 扫描和 95 项功能检查，零违规、零检查错误，并核对了桌面和 320 CSS 像素截图。本轮双视频首屏再次通过构建与检查：11 次 axe 扫描、115 项功能检查，零违规、零检查错误；已核对桌面、完整画面模式及 320 CSS 像素手机截图。详见 [SECURITY.md](SECURITY.md) 和 [ACCESSIBILITY.md](ACCESSIBILITY.md)。

## 修改内容

- `src/data/site.json`：论文题目、作者、图表说明、数值与 BibTeX。
- `src/data/narrative.json`：来自地面交通 PPT 的七段叙事；精确结果继续取自论文。
- `src/data/presentation.json`：新增图示、alt text、长说明、页码与提取记录。
- `src/data/hero-media.json`：首屏仿真片段、来源和完整画面说明。
- `src/components/` 和 `src/pages/`：布局和交互。
- `src/styles/global.css`：响应式样式、可见焦点、打印与 reduced-motion 支持。
- `public/figures/`：原论文图与答辩地面交通部分的图示阅读副本。
- `public/data/`：与 HTML 数值一致的 CSV。修改结果时同步更新并核对原论文。
- `public/media/`：静音片段、封面及英文画面描述 VTT。
- `reports/source-provenance.json`：原 PDF 文件名、SHA-256、提取来源和核对日期。

论文数字使用原表数值，未复用与数值不一致的百分比表述。缺失的训练轨迹数据没有从图片猜测或补造。HTML 研究指南是阅读辅助，不是发表论文的完整替代版本；原始 PDF 未加标签及外部 PDF 阅读顺序等限制仍须如实说明。

## GitHub Pages

`.github/workflows/astro.yml` 在推送 `main` 后执行安装、审计、lint、构建和 axe 检查，再部署 `dist/`。仓库 Settings → Pages → Build and deployment 的 Source 使用 **GitHub Actions**。构建使用仓库名作为 `base`，所有资源通过统一的路径函数生成。

```sh
git add src public scripts package.json package-lock.json README.md ACCESSIBILITY.md SECURITY.md .github astro.config.ts eslint.config.mjs prettier.config.ts
git commit -m "Update research website"
git push origin main
```

分享给导师时发送网站地址；GitHub 仓库地址适合查看源码。GitHub Pages 是公开发布，不是私密审稿空间。

## 素材与规范

视频来源：[Waymo 官方媒体素材库](https://waymo.com/media-resources/)，使用其允许新闻及教育用途的洛杉矶自动驾驶实景素材，标注 “Source: Waymo”。选取原视频 01:08–01:28，制作约 20 秒静音片段，并提供完整文字说明及 VTT 画面描述；不自动播放。该片段用于现实背景，不是论文控制器的实车验证。

SUMO 片段来自用户提供的 `TL_medium.mp4`，选取 00:24–00:46 的连续录屏，保留原始画面和录制速度，仅转换网页播放格式并去除音轨。原始文件保持不变。录屏展示仿真场景；它本身不确证运行的控制策略、RV 占比或量化性能，不能替代论文结果表格。

参考：[UF Web Standards](https://brandcenter.ufl.edu/web-standards/)、[UF EIT Accessibility Policy](https://policy.ufl.edu/policy/electronic-information-technology-and-communication-accessibility-policy/)。中性视觉和免责声明不代表已获得 UF 官方品牌批准。自动化检查也不代表 ADA 或完整 WCAG 认证。

基于 Roman Hauksson 的 [Academic Project Astro Template](https://github.com/RomanHauksson/academic-project-astro-template)，按本研究内容重新实现。已上线的 HOIST 网站由另一个仓库维护。
