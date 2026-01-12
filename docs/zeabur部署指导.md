# Zeabur 部署指导 ⚡

由于 Vercel 的默认域名在国内访问不稳定，推荐使用 **Zeabur** 进行部署。它提供亚太地区节点，国内访问速度极快，且配置流程非常简单。

## 🚀 首次部署

### 1. 准备工作
- 确保你的代码已上传至 **GitHub**。
- 注册并登录 [Zeabur](https://zeabur.com/)（推荐直接使用 GitHub 账号登录）。

### 2. 创建并导入项目

#### 方案 A：使用 Zeabur 托管服务器（最简单）
1. 在 Zeabur 控制台点击 **"Create Project"**。
2. 选择一个区域（如 **Asia East**，国内访问最快）。

#### 方案 B：使用自有服务器（如腾讯云/阿里云）
如果你有自己的服务器，可以让 Zeabur 管理它，从而利用国内服务器的极速带宽：
1. 点击左侧导航栏的 **"Servers"** -> **"Create Server"**。
2. 选择 **"Bring Your Own Node"**。
3. 输入你服务器的 **IP 地址**、**SSH 端口**（默认 22）及 **登录凭据**（密码或 SSH 密钥）。
4. 等待 Zeabur 完成环境初始化（需服务器为 Debian/Ubuntu 系统，推荐 2GB 内存以上）。
5. 在创建项目时，选择你刚刚绑定的这个自定义服务器作为运行节点。

### 3. 构建配置
> [!NOTE]
> 无论是使用方案 A 还是方案 B，后续的导入过程是一致的。

1. 在项目内点击 **"Deploy New Service"** -> **"Git"**。
2. 授权并选中你的 `pk-what-to-eat` 仓库。
3. Zeabur 会自动识别 Vite 项目配置：
- **Build Command**: 自动识别为 `npm run build`。
- **Output Directory**: 自动识别为 `dist`。
*通常情况下，你无需进行任何修改，直接点击部署即可。*

### 4. 绑定访问域名
1. 部署完成后，在服务面板点击 **"Domain"**。
2. 点击 **"Generate Domain"**，输入一个你喜欢的名称（如 `what-to-eat`）。
3. 你将得到一个类似于 `what-to-eat.zeabur.app` 的访问链接。

---

## 🔄 如何更新代码

Zeabur 与 GitHub 是**实时联动**的：

1. **自动更新（最推荐）**：
   - 每当你向 GitHub 提交（`git push`）新代码到主分支（main/master），Zeabur 会探测到代码变动。
   - 它会自动触发新的构建任务，并在完成后将新版本静默上线。
   - **你不需要在 Zeabur 网站上做任何手动操作。**

2. **手动强制部署**：
   - 如果你想手动重新触发一次构建，可以在 Zeabur 服务详情页找到该服务，点击右侧的 **"Redeploy"**。

---

## 💡 小贴士
- **环境变量**：如果未来应用需要 API Key，可以在服务页面的 `Variables` 选项卡中添加。
- **自定义域名**：如果你想绑定自己的 `.com` 域名，也可以在 `Domain` 选项卡中点击 `Custom Domain` 进行配置。

祝你的应用运行顺畅！🍱
