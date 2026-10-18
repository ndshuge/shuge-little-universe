---
name: "鼠哥的小宇宙"
description: "苔绿、瓷白与陶土的小星球，把可探索的世界与清楚可读的内容连在一起。"
colors:
  midnight-sky: "#101f2d"
  ivory-text: "#f4f1df"
  sage-text: "#c0cabf"
  terracotta-accent: "#f39872"
  porcelain-paper: "#f1f0e6"
  forest-ink: "#293a36"
  muted-leaf: "#5e6c60"
  paper-rule: "#d7dcd1"
  day-sky: "#bdd8ce"
  day-ink: "#223d35"
  day-soft: "#49665b"
  moss-ground: "#809d77"
  porcelain-building: "#e9dfc1"
  terracotta-roof: "#b96345"
  wood: "#805d45"
  deep-green: "#233e3d"
  sage-material: "#95b19b"
  patina-metal: "#527570"
  stone: "#b9b99a"
  warm-window: "#f5ca84"
  emissive-amber: "#eaa04e"
  filter-green: "#385b48"
  filter-text: "#f8f6e8"
typography:
  display:
    fontFamily: 'ShugeSans, "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "clamp(48px, 5vw, 78px)"
    fontWeight: 550
    lineHeight: 1.27
    letterSpacing: "-0.035em"
  headline:
    fontFamily: 'ShugeSans, "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "clamp(30px, 3.2vw, 45px)"
    fontWeight: 550
    lineHeight: 1.35
    letterSpacing: "-0.035em"
  title:
    fontFamily: 'ShugeSans, "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "15px"
    fontWeight: 500
  body:
    fontFamily: 'ShugeSans, "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 2.1
  label:
    fontFamily: 'ShugeSans, "Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "11px"
    fontWeight: 400
rounded:
  action: "30px"
  chip: "25px"
  circle: "50%"
  mobile-sheet: "20px 20px 0 0"
  lab-canvas: "12px"
spacing:
  compact: "8px"
  control-gap: "12px"
  card-gap: "18px"
  section: "24px"
  panel-inset: "37px"
  panel-bottom: "55px"
components:
  button-primary:
    backgroundColor: "{colors.terracotta-accent}"
    textColor: "#152a28"
    rounded: "{rounded.action}"
    padding: "14px 23px"
  button-primary-hover:
    backgroundColor: "#ffa986"
  button-secondary:
    rounded: "{rounded.action}"
    padding: "14px 23px"
  camera-button:
    backgroundColor: "#142d3040"
    rounded: "{rounded.circle}"
    size: "33px"
  filter-chip:
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "9px 12px"
  filter-chip-selected:
    backgroundColor: "{colors.filter-green}"
    textColor: "{colors.filter-text}"
  feature-link:
    padding: "20px 33px 20px 0"
  content-panel:
    backgroundColor: "{colors.porcelain-paper}"
    textColor: "{colors.forest-ink}"
    width: "min(530px, 44vw)"
  content-panel-mobile:
    rounded: "{rounded.mobile-sheet}"
    width: "100%"
  landmark-tag:
    backgroundColor: "#0e252cdd"
    rounded: "{rounded.chip}"
    padding: "8px 12px"
---

# Design System: 鼠哥的小宇宙

## Overview

**Creative North Star: "鼠哥的小宇宙"**

这是一个能走进去的微型小镇。苔绿地面托起瓷白建筑、陶土屋顶、温暖窗光与深夜天空；建筑轮廓和通往内容的入口共用一套世界观。亲切、好奇、精致是方向契约中已经确认的气质，不用通用大字海报和无意义粒子来替代这个世界。

界面保持轻：世界承担探索与惊喜，文字在安静的浅色纸面上展开。视觉深度来自真实球面、材质、光照与遮挡；按钮、导航和内容行只提供足够明确的操作提示。小鼠轮廓入口、环绕星球的轨道与可切换昼夜，是可延续的识别特征。

**Evidence status:** 本文件是完成版源码的提取记录，依据 `dist/town.css`、`dist/town.html`、`dist/town.js`、`dist/town-ui.js`，并以 `PRODUCT.md` 和 `.impeccable/direction.md` 核对已确认的视觉意图。浏览器 URL 安全门阻止了本轮观察；桌面、移动端、实际 WebGL 材质与动态效果均未完成运行时视觉验收。源码中的值与行为不等于已观察到的效果。

**Key Characteristics:**
- 苔绿、瓷白、陶土、午夜色构成连续的世界材质。
- 真实球面几何与可辨识的微型建筑承担视觉主体。
- 克制的无衬线文字与浅色内容面板保证阅读秩序。
- 普通链接、键盘入口、暂停动态与降级呈现伴随探索。

## Colors

配色以安静的自然材料为底，让陶土和暖窗光标记可进入的地方。规范数值以本文件 frontmatter 为准；场景的材质色与界面色分别保留其源码值。

### Primary

- **柔陶土**（`terracotta-accent`）：主操作、标题标点、当前导航与默认焦点轮廓。主按钮悬停使用对应组件变体。
- **屋顶陶土**（`terracotta-roof`）：立体世界的屋顶、列车车体和少量雕塑细节。它比界面强调色更沉稳。

### Secondary

- **苔绿地表**（`moss-ground`）：场景草地基础材质；球面本体另外使用源码中的四级顶点色变化。
- **鼠尾草**（`sage-material`）、**铜绿金属**（`patina-metal`）与 **深林绿**（`deep-green`）：植被、轨道、圆顶及建筑暗部，维持同一材料家族。
- **筛选深绿**（`filter-green` / `filter-text`）：浅色面板中已选筛选项和实验切换项。

### Tertiary

- **暖窗金**（`warm-window`）与 **发光琥珀**（`emissive-amber`）：分别承担窗的表面颜色和自发光颜色。昼夜切换改变自发光强度，不把两者合并为界面高亮。

### Neutral

- **午夜天空**（`midnight-sky`）：默认画布与外层页面背景。
- **象牙文字**（`ivory-text`）与 **浅灰鼠尾草文字**（`sage-text`）：深色环境中的主要文字和次要说明。
- **瓷白纸面**（`porcelain-paper`）、**森林墨色**（`forest-ink`）、**柔叶灰**（`muted-leaf`）与 **纸面分隔线**（`paper-rule`）：阅读面板的底、正文、次要正文与细线。
- **瓷白建筑**（`porcelain-building`）、**木色**（`wood`）与 **石色**（`stone`）：建筑墙体、门窗框和台阶。建筑瓷白与阅读纸面是不同材料，不互换。
- **白昼天空**（`day-sky`）、**白昼墨色**（`day-ink`）与 **白昼柔绿**（`day-soft`）：白昼时替换外层背景和文字；阅读面板继续使用原纸面。

**The Material Continuity Rule.** 新增建筑、控件或插画先复用已有材料角色；保留界面陶土、屋顶陶土、纸面瓷白和建筑瓷白之间的差别。

## Typography

**Display Font:** ShugeSans，本地字体文件为 Outfit variable（`fonts/outfit.woff2`，字重范围 100–900）。
**Body Font:** 同一字体栈，中文优先回退至 Microsoft YaHei、PingFang SC，再回退 sans-serif。

**Character:** 拉丁字形与中文系统字体共同形成轻巧、清楚的文字层。标题有紧凑字距，长段落有宽松行高；不引入额外装饰字体。

### Hierarchy

- **Display**：frontmatter 的 display 用于首页介绍；中等桌面改为视口字号，移动端最终规则使用 `clamp(30px, 9.5vw, 42px)`、行高（1.3），并收为单行。
- **Headline**：headline 用于内容面板；移动端字号（35px）。
- **Title**：title 用于有分隔线的入口行。作品卡片标题另用（14px / 550 / 1.5）。
- **Body**：body 用于面板段落，最大行长（65ch）；中等桌面部分正文降至（11px），移动端恢复（12px）。首页说明使用（13px / 2），移动端隐藏该段。
- **Label**：label 用于场景标注、辅助操作、筛选与说明。全局导航默认（12px），小屏（11px）。
- **Lead**：面板引导段落使用（18px / 500 / 1.8），承担正文与标题之间的层次。

**The Quiet Type Rule.** 用字号、字重、行高与留白区分信息；长文本保持浅色纸面和可读行长，不把主要内容直接压在复杂的三维场景上。

## Layout

桌面首页采用介绍与世界相邻的空间构图。页头左右内边距（4.5%），介绍最大宽度（34%），场景从右侧覆盖（83%）宽度；世界层位于介绍下方。视口容器高（100dvh）、最小高（660px）；底部地区导航、场景说明、世界设置和侧边相机控件各有固定位置。

内容面板从右侧进入，桌面宽度见 frontmatter；滚动区内边距为（24px 37px 55px），面板顶部操作区独立。面板打开时介绍退出、场景向左平移，部分页头入口退出交互。作品列表为两列，间距（24px 18px）；其他内容以纵向段落和细分隔线排列。

断点采用源码值：超宽桌面（1600px 起）、中等桌面（1150px 以下）、移动端（760px 以下）、窄屏（370px 以下）。中等桌面面板宽度（47vw）。移动端最终覆盖规则使介绍位于顶部（110px），世界位于其下（300px）且高（470px）；容器最小高（880px，窄屏为 850px）。内容面板在页头下（77px）开始，占满宽度并成为圆角底部阅读页，内部独立滚动。手机控件主要入口的最小触摸高度提升到（44px）；小于等于 370px 时仍保留两列作品。

源码另外允许低矮桌面（高度不超过 660px）纵向滚动。以上是 CSS 定义，尚未通过真实视口观察确认溢出与遮挡。

**The Direct Passage Rule.** 可探索世界和可直接阅读的 HTML 始终并存；新增地区必须有普通链接入口，不能让旋转、射线命中或动画成为阅读前提。

## Elevation & Depth

世界使用真正的球面网格、标准材质、定向光、半球光、边缘光和软阴影产生深度。地面轻微扰动，建筑沿球面法线放置；植被、云、列车与湖面共享这一几何空间。界面只在覆盖关系处用阴影：场景标注与阅读面板抬起，内容行本身保持平坦、用细线分隔。

### Shadow Vocabulary

- **Landmark lift**（`0 5px 15px #00000035`）：悬在世界上的标注。
- **Side panel separation**（`-20px 0 70px #00000040`）：桌面右侧阅读面板与世界之间的层次。
- **Mobile sheet separation**（`0 -12px 60px #00000040`）：移动端阅读页上缘。

**The World Carries Depth Rule.** 让几何、材质和光承担主深度；不要给每段文字或作品条目追加浮起卡片。

## Shapes

重复形态来自球体、环轨、圆顶、鼠耳和柔和胶囊。主次按钮用 action 圆角，筛选用 chip 圆角，相机和关闭按钮为圆形；移动阅读页只有上侧圆角。实验画布使用 lab-canvas 圆角。作品缩略图保持直角矩形与固定纵横比（1.45），入口行通过细线组织，不一律套圆角卡片。

小镇建筑由瓷白立方体、三角挤出屋顶、圆柱、球面圆顶和环组成。新增地点需要可辨认的轮廓，不能只靠换色区分。

## Components

### Buttons

轻巧但有清楚操作层级。主按钮用柔陶土底和深色字，次按钮用透明底与半透明描边；尺寸和圆角以 frontmatter 为准，默认最小高度（47px）。主按钮悬停上移（2px），次按钮悬停出现很淡的暖色填充。移动端最终最小高度（44px）。

相机按钮为圆形描边，在桌面（33px）见方；手机宽（40px）、最小高（44px）。关闭按钮桌面（36px）见方，手机（44px）。禁用按钮不响应点击，透明度（0.4）。

### Chips

作品筛选与实验切换共用胶囊形、细绿灰描边和 label 字号。选中态以深绿实底和浅色文字表示，使用 `aria-pressed`，不能只依赖悬停。移动作品筛选最小高（38px），实验切换最小高（42px）。

### Cards / Containers

作品条目由预览、标题、描述与文字链接组成，默认不设包围边框、圆角或阴影。预览区纵横比（1.45），悬停时图片缩放（1.04）。入口行用上边线和右侧箭头；浅色纸面承载所有阅读内容。

内容面板拥有独立的顶部返回与关闭操作、滚动区和当前页。它不是声明了 `aria-modal` 的模态框：桌面保留世界交互，小屏把被遮挡世界设为 inert。不要描述成已验证的焦点陷阱。

### Inputs / Fields

实验参数为原生 range 输入，宽（100%）、高（24px），使用暖陶土 accent-color，并有可见 label 与数值 output。没有自定义文本输入、错误态或表单验证样式，不为这些未实现状态造规范。

### Navigation

页头是轻量文字导航，当前项与悬停项出现细陶土下划线。底部地区导航以线性图标、细点与标签对应地点，当前项和悬停项变陶土并上移（3px）。切换普通 hash 链接打开匹配内容，当前入口使用 `aria-current="page"`。

世界上的地点标注为小胶囊，由投影位置和遮挡判断控制显示；不可见标注同步退出焦点顺序。白昼标注切换为浅底深绿字。直接导航不依赖这些浮动标签。

### Planet, Portal & Motion

三维舞台可拖动和用方向键旋转；拖动阈值（7px），横向灵敏度（0.006）、竖向灵敏度（0.003），倾斜范围（±0.35 rad）。靠近与远离使用受限距离（9.6–16），初始距离（12）。重置恢复初始朝向与距离。鼠形入口使用短暂径向暗场过渡后打开作品内容。

显式小火车环游使世界旋转一圈（16s）；列车沿球面轨道持续运行。暂停动态停止时间驱动的列车、雕塑、云和星星变化，并取消正在进行的环游；手动调整仍可绘制，显式环游操作可以再次启动。减少动态偏好默认暂停闲置动画、取消 CSS 动画/过渡；“进入小镇”此时直接打开介绍，手动世界操作和主动环游仍可用。声音默认关闭，只由用户手势启用。

渲染器使用透明背景、sRGB 输出、ACES Filmic、曝光（1.15）、像素比上限（1.6）与 PCF 软阴影。页面隐藏时跳过绘制；暂停且没有相机变化、重绘请求时不渲染。加载或初始化失败保留文字导航，隐藏不能工作的相机与列车入口。

### Focus & Status

交互元素与三维舞台有可见轮廓；具体选择器与值保存在 sidecar。打开内容把焦点移到当前标题，Escape 关闭后恢复到仍可见的触发者，否则恢复到站点标识。跳转阅读链接在获得焦点时出现。状态通知使用 `role="status"`、淡色胶囊与短暂显示，不拦截操作。焦点与对比度规则目前是源码证据，尚无浏览器辅助技术验收。

## Do's and Don'ts

### Do:

- **Do** 复用苔绿、瓷白、陶土和午夜的材料角色，并区分界面色与三维材质色。
- **Do** 用建筑轮廓、球面位置和真实链接共同标识地区。
- **Do** 保留浅色阅读面板、原生链接、键盘入口和可见焦点。
- **Do** 尊重减少动态偏好，提供暂停、昼夜与显式声音控制。
- **Do** 把源码定义、运行时观察与视觉验收分别记录。

### Don't:

- **Don't** 用通用大字海报或无意义粒子替换已确认的星球小镇。
- **Don't** 把每个内容条目包装成有阴影的圆角卡片。
- **Don't** 把转动星球、动画或声音变成获取内容的前提。
- **Don't** 把概念图、静态检查或本设计文档描述为 WebGL 与移动端视觉通过。

