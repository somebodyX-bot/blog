# Mizuki → Shirone 本地迁移报告

## 1. 结果概览

- 旧博客：`D:\Blog\Mizuki`，仅做读取和历史分析，未删除、覆盖、重构或提交任何内容。
- 新博客：`D:\Blog\Shirone`。
- Shirone 基线：官方 `main` 分支，版本 `1.0.3`，基线提交 `88ce9e0fdcd77c8ca3be5954eac43c1863263e7c`（2026-09-21）。
- Git 远程：官方仓库已由 `origin` 改名为 `upstream`；未配置新的 `origin`，也未推送或部署。
- 运行环境：Node.js `v24.16.0`（满足项目要求的 `>=22.12.0`）；依赖按项目锁定的 pnpm `9.14.4` 安装。
- 最终产物：`dist\`，共生成 51 个 HTML 文件，其中包含 28 篇个人文章路由。

## 2. 旧项目分析与迁移取舍

### A. Mizuki 原始模板代码

旧项目的 `components`、`layouts`、页面框架和整套样式没有复制到新项目。新博客保留 Shirone 的 Astro/Svelte、Material 3、导航、侧栏、文章渲染、搜索、相册和响应式布局实现。

### B. 个人文章和资源

迁移了 28 篇个人 Markdown 文章，并保留原文件名和扁平目录结构：

`abc306f-merge-sets-solution.md`、`ac-automaton.md`、`connectivity.md`、`hash.md`、`heavy-light-decomposition.md`、`informal-essay-2023.7.20.md`、`kmp.md`、`knapsack.md`、`lagrange-interpolation.md`、`manacher.md`、`mewtype.md`、`mo-algorithm.md`、`network-flow.md`、`noi-trip.md`、`noi2023-trip.md`、`number-theory.md`、`persistent-segment-tree.md`、`polynomial-tech.md`、`segment-tree.md`、`shortest-path.md`、`sqrt-decomposition.md`、`suffix-array.md`、`suffix-automaton-and-array.md`、`thoughts-2.md`、`thoughts.md`、`tree-basics.md`、`trie.md`、`z-function.md`。

资源迁移：

- `src/assets/images/avatar.jpg`：个人头像。
- `public/images/albums/CG/`：CG 相册的 23 个文件（含 `info.json`、封面和照片）。
- `public/assets/mobile-banner/`：4 张移动端背景图。
- `public/images/posts/noi2023-trip/6rl81kz7.png`：原文章中的远程图片已本地化，正文引用同步改为站内路径，避免外链失效。

### C. 站点配置

迁移了站点名称 `somebodyX's Blog`、作者 `somebodyX`、简介 `大本钟邮局快递员`、中文界面、Asia/Shanghai 时区、主题色相 240、站点地址、头像和空社交链接。

旧站的桌面/移动背景轮播改用 Shirone 原生 Banner 配置：桌面 4 张、移动端 4 张、3 秒轮播、保留波浪装饰、关闭运镜和额外背景纹理。没有复制 Mizuki 的整套背景 CSS。

### D. 导航、侧栏和隐藏界面

- 导航保留“首页”“归档”和“我的”下拉菜单；下拉菜单包含“追番”“日记”“相册”。
- “日记”使用 Shirone 原生 Moments 页面替代 Mizuki 的 Diary 实现。
- 左侧保留个人资料、标签和文章目录；右侧保留站点统计、日历和分类，延续旧站双侧栏习惯。
- 音乐、公告、友情链接、项目、技能、时间线、设备、游戏和指南针通过 Shirone 配置关闭或从导航/侧栏移除，没有删除整套组件。
- Mizuki 的最后一次相关提交已经主动隐藏课表入口，因此课表页面未迁移到 Shirone；这是依据旧项目最终状态作出的取舍，而不是猜测。
- 旧站中的 Pio、评论区和页脚未启用，新项目继续保持对应界面不显示。

### E. 其他个性化内容

旧项目的追番和日记数据为空，因此只保留对应原生页面和导航习惯，清除了 Shirone 的示例追番、示例日记、示例系列和示例相册数据。根目录中的临时需求记录不属于已发布博客内容，没有迁移。

## 3. Frontmatter 与 Markdown 兼容处理

- 标题、分类、标签、封面、正文、代码块、数学公式和文章间链接均予以保留。
- 9 篇包含精确时间的文章将 Shirone 使用的 `published` 规范化为日期，同时用 `publishedAt` 保存原始完整时间：`abc306f-merge-sets-solution.md`、`lagrange-interpolation.md`、`mo-algorithm.md`、`noi-trip.md`、`noi2023-trip.md`、`segment-tree.md`、`sqrt-decomposition.md`、`thoughts-2.md`、`thoughts.md`。
- `noi2023-trip.md` 的远程正文图片已改为本地资源路径。
- 未发现需要改写的 MDX 文章；28 篇个人文章均能由 Shirone 正常生成页面。
- Shirone 的 Markdown 语法清单校验要求若干官方语法示例文件存在。这些文件被保留但统一设为 `draft: true`，不会出现在首页、文章列表、搜索或最终文章路由中；普通演示文章已删除。

## 4. 修改的 Shirone 文件

### 配置和数据

- `src/config/siteConfig.ts`：站点信息、中文、主题色和背景轮播。
- `src/config/profileConfig.ts`：头像、作者、简介和社交链接。
- `src/config/navBarConfig.ts`：导航结构和“日记”名称。
- `src/config/sidebarConfig.ts`：双侧栏组件与文章目录布局。
- `src/config/musicConfig.ts`、`announcementConfig.ts`：关闭旧站未使用的音乐和公告。
- `src/config/friendsConfig.ts`、`projectsConfig.ts`、`skillsConfig.ts`、`timelineConfig.ts`、`devicesConfig.ts`、`gamesConfig.ts`、`compassConfig.ts`、`seriesConfig.ts`：关闭不需要的页面功能。
- `src/data/anime.ts`：移除官方演示追番数据。
- `src/content/spec/about.md`：替换为个人简介。

### 局部源码修复

- 未修改任何 Shirone 页面、布局或 UI 组件。
- `src/utils/fancybox-handler.ts` 做了一处局部修复：将不足 4 KB 的 Fancybox 自定义 CSS 改为静态导入，避免生产构建生成一个不存在的动态 CSS 地址。修复后生产预览浏览器控制台错误为 0。

## 5. 删除的演示内容

删除了 Shirone 官方演示追番图片、演示 Moments、演示 Series、演示相册和普通演示文章。`src/content/moments/.gitkeep` 与 `src/content/series/.gitkeep` 用于保留空目录。个人文章、头像、CG 相册、背景和正文附件均未删除。

## 6. 验证结果

- 官方原始项目迁移前：本地开发服务器 HTTP 200，原始构建成功。
- 迁移后开发服务器：正常启动；首页、归档、分类、标签、相册、CG 相册、追番、日记、关于页和代表文章均返回 HTTP 200。
- 28/28 篇个人文章在开发服务器上均返回 HTTP 200。
- 头像、文章图片、相册封面和移动背景资源均能访问。
- 首页包含迁移后的站点名、个人简介和目标导航；不包含课表、友情链接和项目入口。
- 生产预览使用 Edge/Playwright 检查首页、文章和 CG 相册，图片无损坏，浏览器控制台错误为 0。
- `pnpm check`：279 个文件，0 errors、0 warnings、0 hints。
- `pnpm check:manifest`：组件、Markdown 语法和项目 skills 清单全部通过。
- `pnpm build`：成功，51 个页面，Pagefind 建立 29 个中文页面索引，字体检查通过；`dist\` 可直接用于静态部署。

构建环境无法访问 Fontsource 元数据接口时会显示非致命警告，但本地字体子集仍成功生成，构建退出码为 0。空 Moments/Series 集合也会产生提示，这是保留空页面但移除演示数据后的预期状态。

补充检查 `pnpm type-check` 仍会报告 Shirone 1.0.3 官方源码中 26 个 `isolatedDeclarations` 类型标注问题，位置均在未迁移的主题核心配置、集成、插件和工具文件；迁移文件没有出现在这些错误中。为保持后续升级能力，本次没有大范围重构官方核心来规避该上游问题。

## 7. 本地运行和构建

在 PowerShell 中运行：

```powershell
cd D:\Blog\Shirone
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

浏览器访问 `http://localhost:4321/`。

生成静态网站：

```powershell
cd D:\Blog\Shirone
corepack pnpm build
```

输出目录为 `D:\Blog\Shirone\dist`。

## 8. 后续更新 Shirone 的注意事项

当前克隆为了适应网络条件使用了浅克隆。首次需要完整历史时可执行：

```powershell
git fetch --unshallow upstream
git fetch upstream main
```

合并或变基官方更新前，重点检查以下自定义范围：

- `src/config/siteConfig.ts`
- `src/config/profileConfig.ts`
- `src/config/navBarConfig.ts`
- `src/config/sidebarConfig.ts`
- 本报告第 4 节列出的功能开关配置
- `src/utils/fancybox-handler.ts`
- `src/content/posts/`、`src/content/spec/about.md`
- `src/assets/images/avatar.jpg`
- `public/images/albums/CG/`、`public/images/posts/`、`public/assets/mobile-banner/`

创建个人 GitHub 仓库后，再执行 `git remote add origin <个人仓库地址>`；目前只保留 `upstream`，没有配置 `origin`。

## 9. 未完全迁移的内容

- 课表实现未迁移：旧项目最终状态已隐藏该入口。
- Mizuki 的全屏壁纸/CSS 机制未原样复制：已改用 Shirone 原生 Banner 轮播，视觉素材和轮播习惯已保留。
- 旧站未启用且没有个人数据的功能没有复制旧实现，而是保持 Shirone 原生关闭状态。

除上述有意取舍和上游 `type-check` 问题外，没有发现个人文章或静态资源缺失。
