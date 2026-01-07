# PK What To Eat (纠结星人的救星 🚀)

这是一个专为“中午吃什么”这类终极难题设计的互动决策工具。采用竞技场淘汰赛（Tournament Bracket）的形式，让食物在对决中决出唯一的“天选之食”。

## ✨ 核心功能

- **🏆 竞技场 PK 系统**：将候选食物进行两两对决，用户通过直觉快速选择，层层晋级直到选出冠军。
- **⚙️ 智能化配置中心**：
    - **食物实验室**：支持自定义添加新食物（名称、图标、颜色）。
    - **规模定制**：支持 4 / 8 / 16 强多种对阵规模。
    - **速度限制**：可调节自动选择倒计时，增加决策的紧迫感。
    - **库存管理**：内置丰富的默认食物库，支持一键随机抽取对阵名单。
- **📊 战报分享**：自动生成精美的 PK 晋级路线图（Poster），支持一键下载为图片，分享你的心路历程。
- **💾 自动持久化**：所有的自定义食物和配置均会自动保存到本地浏览器。

## 🛠️ 技术方案

- **核心框架**：[React 19](https://react.dev/) - 采用最新的 Hook 架构。
- **构建工具**：[Vite 7](https://vitejs.dev/) - 极速的热更新体验。
- **样式方案**：[Tailwind CSS v4](https://tailwindcss.com/) - 声明式 UI 设计。
- **动画引擎**：[Framer Motion](https://www.framer.com/motion/) - 提供平滑的转场和对决动效。
- **图标库**：[Lucide React](https://lucide.dev/) - 简洁且一致的图标系统。
- **图片导出**：[html-to-image](https://github.com/bubkoo/html-to-image) - 客户端实时渲染高清战报海报。

## 🚀 快速开始

### 环境依赖
确保你已经安装了 [Node.js](https://nodejs.org/)。

### 安装步骤
1. 克隆项目
2. 进入目录并安装依赖：
   ```bash
   npm install
   ```

### 可用命令

除了开发命令外，本项目还支持以下脚本：

| 命令 | 说明 |
| :--- | :--- |
| `npm run dev` | 启动开发服务器（支持热更新）。 |
| `npm run build` | **执行生产环境构建**。将代码压缩并优化，输出到 `dist` 目录。 |
| `npm run preview` | 在本地预览生产环境构建后的产物。 |
| `npm run lint` | 使用 ESLint 检查并修复代码规范问题。 |

## 📦 分享与部署

如果你想把这个工具分享给朋友，或者部署到自己的服务器，可以按照以下步骤操作：

### 1. 构建产物
在终端运行：
```bash
npm run build
```
执行完成后，项目根目录会生成一个 **`dist`** 文件夹。这个文件夹包含了应用运行所需的全部静态资源（HTML, JS, CSS）。

### 2. 如何分享
- **纯文件分享**：你可以直接将 `dist` 文件夹压缩发送给别人。
- **静态托管（推荐）**：将 `dist` 文件夹上传到任何静态资源托管服务，例如：
  - [GitHub Pages](https://pages.github.com/)
  - [Vercel](https://vercel.com/)
  - [Netlify](https://www.netlify.com/)

### 3. 他人如何使用
- **开发者**：拿到源代码后运行 `npm install` 和 `npm run dev`。
- **普通用户**：
  - 如果你部署到了线上，对方直接访问 URL 即可。
  - 如果对方拿到了你的 `dist` 文件夹，他们需要一个简单的 web 服务器来打开（直接双击 `index.html` 可能因路径问题无法运行）。
  - **快速预览方法**：在 `dist` 目录下运行 `npx serve` 或使用 VS Code 的 `Live Server` 插件。

---

**Made with ❤️ by Dopamine Decision Engine**
