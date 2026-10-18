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

## 架构

纯 HTML / CSS / JavaScript，`dist/` 是 GitHub Pages 发布根目录。Three.js 本地 vendored，无运行时 CDN。旧版页面作为 `dist/classic.html` 留在新版站内，原始 V1 的 Git 提交另存为离线 ZIP。主分支推送后 GitHub Actions 仅发布本仓库 `dist/`，不碰 ChatGPT Sites 和其他仓库。

作品介绍与链接来自公开项目；小镇是创意场景，并非学校实景。公开简介及联系方式由主页所有者确认。
