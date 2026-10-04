# MIXED TRAFFIC — 论文项目网页

论文：**Large-Scale Mixed-Traffic and Intersection Control using Multi-agent Reinforcement Learning**。以作者提供的正式发表 PDF 为事实来源；原始 PDF 保持不变，不在仓库中重新分发。

网站地址：<https://cgchrfchscyrh.github.io/mixed_traffic/>。科研代码仓库与本网页仓库分开：<https://github.com/cgchrfchscyrh/MixedTrafficControl_IROS>。

## 网站内容

- `/`：英文论文介绍、真实场景视频与论文图并列的首屏、方法、结果对比、研究边界、引用。
- `/paper/`：HTML 研究指南，明确是论文的阅读辅助，不是完整逐字转录。
- `/results/`：原始图、详细文字说明、结果表格及 CSV 下载。
- `/accessibility/`：无障碍说明、媒体来源、附件限制和联系信息。
- `/404.html`：保留导航与 UF 非官方立场声明的错误页面。

中性炭黑和灰白界面不使用 UF 标志或蓝橙主题。保留论文作者单位和所有页面的 UF 非官方立场声明。原论文图的科学配色保持不变，另提供文字和表格说明。

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

2026 年 10 月 4 日已更新 `http-cache-semantics` 至修复版 4.3.0，当前依赖审计为零漏洞。`audit:security` 不再使用公告例外，会阻止存在漏洞或审计失败的部署。详见 [SECURITY.md](SECURITY.md)。

## 修改内容

- `src/data/site.json`：论文题目、作者、研究叙事、图表说明、数值与 BibTeX。
- `src/components/` 和 `src/pages/`：布局和交互。
- `src/styles/global.css`：响应式样式、可见焦点、打印与 reduced-motion 支持。
- `public/figures/`：从原 PDF 提取的 PNG。
- `public/data/`：与 HTML 数值一致的 CSV。修改结果时同步更新并核对原论文。
- `public/media/`：静音片段、封面及英文画面描述 VTT。
- `reports/source-provenance.json`：原 PDF 文件名、SHA-256、提取来源和核对日期。

论文数字使用原表数值，未复用与数值不一致的百分比表述。缺失的训练轨迹数据没有从图片猜测或补造。eVTOL 的公开研究仓库目前尚未发布实现，因此按钮使用 “Project repository”，而不是声称代码已公开。

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

参考：[UF Web Standards](https://brandcenter.ufl.edu/web-standards/)、[UF EIT Accessibility Policy](https://policy.ufl.edu/policy/electronic-information-technology-and-communication-accessibility-policy/)。中性视觉和免责声明不代表已获得 UF 官方品牌批准。自动化检查也不代表 ADA 或完整 WCAG 认证。

基于 Roman Hauksson 的 [Academic Project Astro Template](https://github.com/RomanHauksson/academic-project-astro-template)，按本研究内容重新实现。已上线的 HOIST 网站由另一个仓库维护。
