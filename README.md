# PixivBiuWeb

PixivBiu的新Web实现，使用 `Vue3` + `Vue Router` + `TailwindCSS` 编写

# 优化功能
- 单页应用设计
- 整体UI设计优化
- 筛选及排序算法优化
- 支持多图预览（鼠标滚动切换）
- 使用大量图形控件代替原版字符指令
- 预览时动态加载大尺寸图片
- 响应式布局

# 使用
- 注意：项目当前仍在完善阶段，存在大量未完成/验证/缺陷功能，当前仅支持通过开发环境方式使用

使用`git clone`克隆本项目至本地
```
git clone https://github.com/OREOCODEDEV/PixivBiuWeb.git
```
使用`npm`部署运行环境
```
npm install
```
修改`vite.config.js`配置下的`/api`反代服务器地址为本地 PixivBiu 后端地址
```
"/api": {
    target: "http://127.0.0.1:4001",
},
```
以开发环境启动项目
```
npm run dev
```
当前未编写首页，若打开页面为空白请尝试手动进入搜图URL体验：
```
http://localhost:5173/search/%E4%BB%81%E8%8F%9C/all
```

# 预览
<img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/ab3dac61-b9c5-41d3-b74e-5f02d7b59fed" />
<img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/ab54f4aa-5764-452a-82a1-8c766a4261d8" />

