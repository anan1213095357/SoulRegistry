# 📖 生死簿 (Soul Registry) 
### *一本用 Blazor 与 AI 面相识别驱动的赛博阴间档案*

![Blazor](https://img.shields.io/badge/Blazor-8.0-512BD4?logo=blazor)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite)
![AI](https://img.shields.io/badge/AI-Face_Recognition-FF6B6B?logo=openai)
![License](https://img.shields.io/badge/License-MIT-green)

> "天地玄黄，宇宙洪荒。凡人阳寿，皆定于此。"
> 
> 这是一个基于 .NET Blazor 构建的极致中式恐怖美学交互网页应用。通过 3D CSS 变换与 AI 面相识别技术，让你在浏览器中体验执掌阴曹地府、录入亡魂的沉浸式快感。

## 📸 界面与功能演示

**主页：阎罗大殿**
<img width="100%" alt="主页" src="https://github.com/user-attachments/assets/d6e48113-341b-491b-80c4-d7b9bdbfe03d" />

**功能：寻魂镜与面相录入**
<img width="100%" alt="功能演示" src="https://github.com/user-attachments/assets/1b8ee2a4-41fa-4475-9d45-1d2bd381b340" />

---

## 🌟 核心特性

### 📖 极致 3D 物理书本
- **纯 CSS 3D 构建**：无需 WebGL，利用 `transform-style: preserve-3d` 打造包含封面、封底、书页厚度（`max-thick`）的逼真古籍。
- **动态厚度演算**：随着翻页进度（`--progress`），左右两侧的书本厚度会实时进行 CSS 变量计算与 3D 旋转，完美还原真实翻书物理反馈。
- **虚拟渲染优化**：生死簿共 **3000 页**，但通过 Blazor 逻辑仅渲染当前可视区附近的 **10 页**，确保在任何设备上都能保持 60fps 的丝滑翻页动画。

### 🔍 寻魂镜 (AI Face Search)
- **面相检索**：点击右上角的「寻魂镜」，上传一张人脸照片。
- **八荒六合定位**：系统提取人脸特征向量（Descriptor），在 SQLite 数据库中比对。若查到此人，生死簿将自动施展“法术”，瞬间翻页至该魂魄所在的精确页码。
- **轮回查重**：录入新魂时，AI 会自动查重。若此人已在生死簿中，系统将降下天罚提示：“此人魂魄已入轮回记录！休想瞒天过海！”

### 🎨 赛博阴间美学
- **做旧纸张纹理**：使用 SVG 滤镜（`feTurbulence`）与多层径向渐变，完美模拟历经沧桑的泛黄古籍纸张与血渍。
- **环境氛围特效**：
  - 底层 **Vanta.js 红雾**：模拟阴间弥漫的血色瘴气。
  - 顶层 **CSS 飘动飞烟**：不规则的 Keyframe 动画，营造“阴风阵阵”的视觉错觉。
  - **鼠标视差跟随**：书本会根据鼠标/触摸位置产生 3D 倾斜（Tilt），仿佛悬浮于阎罗大殿之上。
- **拟真音效**：内置 BGM 与宣纸翻页音效，通过 `IJSRuntime` 精准控制触发时机。

### 📱 响应式移动端适配
- 针对手机竖屏访问，CSS Media Query 会自动将整个 3D 场景旋转 90 度，将物理屏幕的宽高互换，完美适配移动端浏览习惯。

---

## 🛠️ 技术栈

| 领域 | 技术 / 库 | 说明 |
| :--- | :--- | :--- |
| **前端框架** | Blazor Server (.NET 8) | 提供 `InteractiveServer` 渲染模式与双向绑定 |
| **UI / 样式** | CSS3, Razor | 深度使用 CSS 变量、3D Transform、Mask、SVG 滤镜 |
| **数据库** | SQLite | 轻量级本地存储，记录亡魂数据与特征向量 |
| **AI 视觉** | Face Recognition API | 提取特征向量进行余弦相似度比对 (前端推理) |
| **特效引擎** | Vanta.js (Clouds) | 提供底层 WebGL 雾气渲染，已通过 JS 修改为血色配色 |
| **交互逻辑** | JSInterop | C# 与 JS 无缝通信，处理音频、文件上传与 AI 回调 |

---

## 🚀 快速开始

### 环境要求
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- 现代浏览器 (Chrome / Edge / Safari)

### 运行步骤
1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/soul-registry.git
   cd soul-registry
