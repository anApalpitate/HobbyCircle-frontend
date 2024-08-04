# HobbyCircle - 前端部分

## 目录结构

- `public/` - 静态文件目录
  - `index.html` - 入口 HTML 文件
- `src/` - 源代码目录
  - `index.css` - 全局样式
  - `App.jsx` - 应用的主要组件
  - `main.jsx` - 入口文件
  - `css/`  \- CSS 文件目录
    - `ActivePage.css` - 活动页面样式
    - `auth.css` - 认证相关样式
    - `CirclePage.css` - 圈子页面样式
    - `CreateCirclePage.css` - 创建圈子页面样式
    - `HomePage.css` - 首页样式
    - `InfPage.css` - 信息页面样式
    - `MakePostPage.css` - 创建帖子页面样式
    - `post.css` - 帖子相关样式
  - `components/` \- 页面内小组件目录
    - `Bar.jsx` - 导航条组件
    - `CircleList.jsx` - 圈子列表组件
    - `CommentArea.jsx` - 评论区域组件
    - `LoginForm.jsx` - 登录表单组件
    - `Post.jsx` - 帖子组件
    - `RegisterForm.jsx` - 注册表单组件
  - `pages/`  \- 页面组件目录
    - `LoginPage.jsx` - 登录页面组件
    - `RegisterPage.jsx` - 注册页面组件
    - `Homepage.jsx` - 首页组件
    - `CreateCirclePage.jsx` - 创建圈子页面组件
    - `CirclePage.jsx` - 圈子页面组件
    - `MakePostPage.jsx` - 创建帖子页面组件
    - `InfPage.jsx` - 信息页面组件
    - `ActivePage.jsx` - 活动页面组件
  - `api/` \- API 请求处理目录
    - `auth.jsx` - 认证相关 API
    - `circle.js` - 圈子相关 API
    - `comment.js` - 评论相关 API
    - `image.js` - 图片相关 API
    - `Inf.js` - 信息相关 API
    - `post.js` - 帖子相关 API
    - `user.js` - 用户相关 API
  - `assets/` - 静态资源目录
- `package.json` - 项目配置和依赖
- `vite.config.js` - Vite 配置文件
- `tailwind.config.js` - Tailwind CSS 配置文件
- `README.md` - 项目说明文件



## 技术栈

- **React** - 用于构建用户界面的 JavaScript 库
- **Vite** - 下一代前端工具，具有快速构建和热更新
- **Tailwind CSS** - 实用优先的 CSS 框架，用于快速设计和开发
- **React Router** - 用于在 React 应用中实现路由管理
- **axios** - 用于执行 HTTP 请求

## 使用指南（项目运行方式）

完成了项目构建，未打包成exe( ~~技术有限且时间来不及了~~ )

在项目目录下命令行运行：npm run preview

