# 鼠哥的小宇宙 · SHUGE Little Universe

独立的个人主页 V2：一颗可探索的 3D 小星球，连接校园、生活、作品、创意实验与联系方式。

**新站地址**：https://ndshuge.github.io/shuge-little-universe/

**原站保持不变**：https://curious-practice-1017.ndshuge.chatgpt.site （原 V1 站点为登录受限的 ChatGPT Sites 部署）。原 GitHub 个人仓库 https://github.com/ndshuge 也不修改。

## 运行与质量检查

无需 npm install。Node.js 直接运行 `npm start`，默认地址 http://127.0.0.1:5197/（可用 `PORT` 指定端口）。

- `npm run check`：语法检查。
- `npm run check:scene`：真实 Three.js 几何构造和控件的 CPU 验收；不代表 GPU 验收。
- 启动服务后 `npm run check:http`：静态资源及 HTTP 验收。支持 `TEST_BASE_URL` 指定地址。
- 线上浏览器实测：Windows Edge + Playwright，在真实 WebGL 初始化后校验桌面 1440×900、移动端 390×844 的画布、5 个内容导航及旧版入口，共 19/19 通过。截图和结构化结果见 `evidence/live-ready-*.png` 及 `evidence/remote-browser-qa.json`。这不能替代真机触摸测试。
- 可选本机复验：设置 `PLAYWRIGHT_MODULE_PATH` 为已安装的 Playwright 模块目录，再执行 `node scripts/check-browser.cjs`；可用 `BASE_URL` 自定义目标站点。无需为生产运行安装 Playwright。
- iPhone 触摸体验修复（2026-10-18）：小镇与粒子画布均禁止浏览器把单指拖动解释为页面滚动；内容面板保留正常滑动。实验馆粒子恢复 4200 点、3D 透视和形态过渡，并增强立体结与鼠形轮廓。可通过 `node scripts/check-touch-particles.cjs` 进行真实触摸事件模拟（需要 `PLAYWRIGHT_MODULE_PATH`）。7/7 交互回归通过，且已对 GitHub Pages **正式线上地址**重新进行 7/7 触摸模拟与 19/19 浏览器测试。证据位于 `evidence/mobile-regression.json`、`evidence/remote-browser-qa.json`，三种形态效果见 `evidence/repair-*-mobile.png`。仍需实体 iPhone Safari 复验。

### 2026-10-19 手机星球拖动手感优化

根据真实 iPhone 使用反馈修复方向性迟滞：原实现左右/上下灵敏度不同（0.006 / 0.003 rad/px），俯仰角被限制为 ±0.35 rad，且拖动时仍按慢速 easing 追赶触摸位置。新版在按住时直接跟手，以相同的触摸系数 0.012 rad/px 响应左右和上下，取消俯仰死角；松手后保留平滑过渡。重构了星球的触摸命中层级，并允许从浮动「创作馆」等标签上直接开始拖动，同时轻点标签仍可导航；移动端阴影图降至 1024²、像素比上限调整为 1.5 以减轻 GPU 负担。粒子实验及普通页面滑动互不影响。

测试：`node scripts/check-drag-feel.cjs`，通过 Edge 移动触摸仿真验收上下左右、斜向、短距离快拖、连续超一圈的纵向旋转、浮动标签起点、点击标签以及内容面板滑动。在正式 GitHub Pages 地址复验 **11/11 通过**，验收数据为 `evidence/drag-feel-qa.json`，对应 Pages 发布记录为 [39192692979](https://github.com/ndshuge/shuge-little-universe/actions/runs/39192692979)。模拟不能代替用户真实 iPhone Safari 的手感验收。

## 架构

纯 HTML / CSS / JavaScript，`dist/` 是 GitHub Pages 发布根目录。Three.js 本地 vendored，无运行时 CDN。旧版页面作为 `dist/classic.html` 留在新版站内，原始 V1 的 Git 提交另存为离线 ZIP。主分支推送后 GitHub Actions 仅发布本仓库 `dist/`，不碰 ChatGPT Sites 和其他仓库。

作品介绍与链接来自公开项目；小镇是创意场景，并非学校实景。公开简介及联系方式由主页所有者确认。
