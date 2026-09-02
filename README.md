<p align="center">
  <br>
  <img src="https://github.com/user-attachments/assets/d6e48113-341b-491b-80c4-d7b9bdbfe03d" width="800" alt="生死簿主页" style="border-radius: 8px; box-shadow: 0 10px 30px rgba(139,0,0,0.3);">
  <br>
</p>

<h1 align="center">📜 生死簿 · 幽冥录</h1>

<p align="center">
  <i>"天地玄黄，宇宙洪荒。凡人阳寿，皆定于此。生人勿视，违者勾魂。"</i>
</p>

<p align="center">
  游离于阴阳交界处的赛博法器。以 Blazor 为骨，CSS 3D 为皮，AI 面相为魂。<br>
  翻开此卷，你便是执掌轮回的判官。
</p>

---

## 🕯️ 阴阳两界之景

**【阎罗大殿】** 
*血雾弥漫，古籍悬浮。三千世界，尽在这一纸泛黄之间。*
<p align="center">
  <img width="2559" height="1431" alt="fm1" src="https://github.com/user-attachments/assets/59a4ec77-36eb-43c9-a2af-c80165ce0c6b" />
</p>

**【寻魂孽镜】**
*上传面相，天眼洞开。八荒六合之内，查无此人则罢，若有记录，生死簿将自行翻页，锁定其魂魄所在之页。*
<p align="center">
  <img width="2559" height="1431" alt="fm" src="https://github.com/user-attachments/assets/0f69de4b-a871-494b-8e3f-20b0f7a38649" />

</p>

---

## 🩸 法器录 (Features)

### 📖 幽冥古卷 (3D 物理渲染)
摒弃笨重的 WebGL，纯靠 **CSS3 3D Transform** 打造极具压迫感的古籍。
- **动态厚度演算**：随着翻页进度，左右两侧的书脊厚度（`max-thick`）会实时进行 CSS 变量计算与 3D 旋转，完美还原真实翻书物理反馈。
- **SVG 做旧纸张**：利用 `feTurbulence` 滤镜与多层径向渐变，模拟历经沧桑的泛黄古籍、水渍与暗红血斑。
- **三千世界，一叶障目**：生死簿共 **3000 页**，但通过 Blazor 逻辑仅渲染当前可视区附近的 **10 页**（视窗剔除），确保在任何设备上都能保持 60fps 的丝滑翻页。

### 🪞 寻魂孽镜 (AI 面相检索)
- **天眼神通**：点击右上角「寻魂镜」，上传一张人脸照片。
- **八荒定位**：前端提取人脸特征向量（Descriptor），在 SQLite 轮回司库中比对。若查到此人，生死簿将自动施展“法术”，瞬间翻页至该魂魄所在的精确页码。
- **轮回查重**：录入新魂时，AI 会自动查重。若此人已在生死簿中，系统将降下天罚提示：*“此人魂魄已入轮回记录！无论如何变换样貌，休想瞒天过海！”*

### 🌫️ 阴风血雾 (沉浸式氛围)
- **底层瘴气**：引入 `Vanta.js` 并篡改其 WebGL 着色器配色，生成弥漫在屏幕底部的暗红色血雾。
- **顶层飞烟**：纯 CSS 编写的极度模糊（`blur(80px)`）不规则 Keyframe 动画，营造“阴风阵阵”的视觉错觉。
- **鼠标视差**：书本会根据鼠标/触摸位置产生 3D 倾斜（Tilt），仿佛悬浮于大殿之上，随时会跌落凡间。

---

## ⚙️ 术法解构 (Tech Stack)

| 阴阳界域 | 施法媒介 | 术法说明 |
| :--- | :--- | :--- |
| **阳世基座** | `.NET 8 Blazor Server` | 提供 `InteractiveServer` 渲染模式，C# 掌控全局状态。 |
| **幻术引擎** | `CSS3` / `Vanta.js` | 深度使用 CSS 变量、3D Transform、Mask 与 WebGL 雾气。 |
| **轮回司库** | `SQLite` | 轻量级本地阴曹数据库，记录亡魂数据与特征向量。 |
| **天眼神通** | `Face-API` / `JSInterop` | 前端 JS 提取特征向量，通过 `[JSInvokable]` 回调 C# 执行判决。 |
| **阴间音律** | `HTML5 Audio` | 通过 `IJSRuntime` 精准控制 BGM 与宣纸翻页音效的触发时机。 |

---

## ⛩️ 开坛做法 (Getting Started)

> **警告**：凡人阳气不足者，请在夜间佩戴耳机独自运行。

**1. 聚灵 (Clone)**
```bash
git clone https://github.com/yourusername/soul-registry.git
cd soul-registry
