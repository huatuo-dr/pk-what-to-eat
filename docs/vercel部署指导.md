# Vercel 部署详细指导 🚀

本手册将引导你如何将“今天吃什么”应用部署到 Vercel 云端，让你的朋友们可以通过网址直接访问。

## 方案一：GitHub/GitLab 关联部署（最推荐 ✨）

这是最简单且最专业的方式。每当你更新代码到仓库，Vercel 会自动帮你重新部署。

### 1. 准备工作
- 将你的代码上传到你的 GitHub、GitLab 或 Bitbucket 仓库。
- 注册并登录 [Vercel](https://vercel.com/)。

### 2. 导入项目
1. 在 Vercel Dashboard 点击 **"Add New"** -> **"Project"**。
2. 在列表里找到你的项目仓库，点击 **"Import"**。

### 3. 配置项目
Vercel 会自动识别出这是一个 Vite 项目，你通常**不需要**修改默认配置。
- **Framework Preset**: 自动识别为 `Vite`。
- **Build Command**: `npm run build`。
- **Output Directory**: `dist`。

### 4. 发布
点击 **"Deploy"**。等待大约 1 分钟，你就会得到一个正式的二级域名（例如：`pk-what-to-eat.vercel.app`）。

---

## 方案二：Vercel CLI 命令行部署（无需 Git 关联）

如果你不想将仓库公开，或者想直接从本地文件夹快速上线，可以使用 CLI 工具。

### 1. 安装 Vercel CLI
在终端（PowerShell 或 CMD）运行：
```bash
npm install -g vercel
```

### 2. 登录
```bash
vercel login
```
根据提示在浏览器中完成授权登录。

### 3. 执行部署
在项目根目录下（即包含 `package.json` 的目录）运行：
```bash
vercel
```
**注意：**
- 过程中会询问你一些配置问题，通常一路回车（按 Enter）使用默认选项即可。
- 如果询问 `Build Command` 或 `Output Directory`，确保分别是 `npm run build` 和 `dist`。

### 4. 上线生产环境
上述命令会生成一个预览链接。如果你确认没问题，运行以下命令正式上线：
```bash
vercel --prod
```

---

## ❓ 常见问题

### 1. 部署后访问是空白页？
- 确认 `Output Directory` 是否设置为 `dist`。
- 确认你的路由模式。如果你使用的是 `HashRouter`，通常不会有问题。如果你使用的是网页标准的路由，可能需要配置 Vercel 的重写规则（项目根目录添加 `vercel.json`）。

### 2. 我的自定义食物没有了？
- 应用使用 `localStorage` 存储自定义食物。部署到新网址后，数据是存储在每个人的浏览器本地的，因此不同网址之间数据不互通。

### 3. 如何更新？
- 如果是用方案一：只需 `git push` 代码，Vercel 会自动更新。
- 如果是用方案二：再次运行 `vercel --prod` 即可。

---

**祝你用餐愉快！🍱**
