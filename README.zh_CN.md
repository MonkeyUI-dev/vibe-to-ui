# vibe-to-ui

> 面向 vibe coding 开发者的 Agent Skills 技能包 —— 无需设计师经验也能打造专业级 UI。

---

## vibe-to-ui 是什么？

**vibe-to-ui** 是一套 [Agent Skills](https://agentskills.io) 技能包，为 AI 编程助手（Claude Code、GitHub Copilot、Cursor 等）注入专业的设计知识，帮助那些凭感觉写代码、但不擅长设计语言的开发者。除了静态视觉 Token，vibe-to-ui 还能提取和生成**动效系统** —— 定义 UI 元素何时、如何以及为何需要动画，以传达含义和产品气质。通过**视觉素材生成**，还可根据产品背景与已确认的设计方向生成 Hero 插画、功能配图与空状态插图（由 Agent 的图像工具或 MCP 调用）。Agent 采用协作模式工作 —— 所有设计探索都通过独立的预览页面和概念稿进行，只有当你确认方向并要求应用时，才会修改你的项目。

---

## 为什么做 vibe-to-ui

**让每一位开发者，都能表达心中的美。**

这个世界有无数出色的开发者——他们能构建复杂的系统，能解决棘手的问题，却常常在「让它看起来好看」这件事上卡住。不是因为缺乏审美，而是因为没有工具帮他们把那种感受翻译成设计语言。

灵感从不只存在于设计稿里。它可能是街角转弯时的一瞬光影，是陌生人的一个微笑，是某段让你流泪的旋律。那些让你心动的瞬间，本身就是最真实的设计语言。

vibe-to-ui 是这把翻译工具。把一张照片、一段录音、一种说不清道不明的感受交给它——它会提取那份美的内核：空间节奏、色彩气质、动效性格，并将这份语境传递给你的 Agent，融入你正在构建的产品，再通过你的产品，传递给这个世界。

我们相信：当更多开发者能将生活里触动过自己的美带入设计，这个世界会拥有更多形态各异、真正有温度的产品。

> 不是让所有产品都变得精致相似，而是让每个人都能找到只属于自己的美。

---

## 技能

面向 vibe coding 开发者的设计助手。将截图、情绪图片和直觉感受转化为结构化的设计系统、动效语言与布局蓝图 —— 所有探索都通过独立的预览页面协作完成，只有当你准备好时才会将设计应用到项目。

**六大核心能力：**

#### 1. 设计系统提取
*适用于：拥有完整设计稿需要还原风格的用户。*

提供一张 UI 截图或设计稿，该技能将提取其完整的"风格 DNA"并生成一个**独立预览页面**供你评估 —— 在你确认之前不会修改你的项目：

- **颜色** —— 带语义角色（主色、背景色、文字色、边框色等）
- **排版** —— 字体族、字号比例、字重、行高
- **间距** —— 基础单位与一致的倍数比例
- **圆角** —— 各组件的圆角策略
- **阴影** —— 层级投影系统
- **动效** —— 节奏、缓动曲线、动效密度、触发方式、减少动画适配

输出三种格式的设计 Token：**CSS 自定义属性**、**Tailwind CSS 配置**和 **JSON Token 文件** —— 仅在你确认预览后才应用到项目。

#### 2. 设计探索
*适用于：只有一种模糊感觉的用户。*

不确定想要什么风格？只有一些粗略的灵感 —— 一张风景照、一种喜欢的颜色、一种模糊的氛围，或某段捕捉到你感觉的音乐？该技能将引导你完成互动对话：

1. 说明你的项目用途和目标用户
2. 上传任意灵感图片（风景、物体、其他应用 —— 任何东西皆可）**或音乐录音**（音频片段、哼唱旋律、歌曲片段）
3. 技能将视觉信号与音频信号一同转化为设计特质 —— 节奏、音色和韵律会映射为 UI 中的活力感、温度感和质感
4. 综合生成 **3 个不同的设计概念** —— 每个都有独立的视觉风格**和动效个性** —— 并为每个概念生成**独立概念预览页面**（带悬停过渡和入场动画）以及**情绪看板**
5. 你进行反馈、比较与选择 —— 或混合不同概念的元素
6. 确定方向后，将其正式整理为包含动效 Token 的完整设计系统及预览页面
7. 确认后，将设计应用到你的项目（通过能力 5 实现）

#### 3. UI 布局分析
*适用于：无法用语言描述布局的用户。*

提供一张网页截图，该技能将其布局结构提取为人类和 LLM 均可理解与复用的格式：

- **ASCII 艺术图** —— 任何模型都能解析的可视化布局地图
- **语义结构** —— 逐区块的角色描述
- **响应式行为说明** —— 布局在不同断点下的适配方式
- **HTML 骨架** —— 干净的标记结构，可直接添加样式
- **组件树** —— 所有 UI 部件的层级拆解

#### 4. 情绪看板生成
*适用于：在锁定 Token 之前需要可分享视觉方向的用户。*

将灵感与审美信号整理为**独立 HTML 情绪看板**：

- 将参考 curated 成连贯视觉叙事，而非素材堆砌
- 展示色彩、字体气质、材质与动效暗示
- 与页面原型保持一致，避免偏离产品形态
- 支持多方向并排对比

生成工具可用时，优先嵌入**真实生成配图**；否则回退 CSS 占位（见 [MOOD-BOARD.md](references/MOOD-BOARD.md)）。

#### 5. 应用设计到项目
*适用于：已确认设计方向并准备应用的用户。*

在探索并选择了设计方向之后 —— 无论来自概念预览、情绪看板还是设计系统提取 —— 该能力将最终确认的设计系统应用到你的实际项目：

- 确认应用范围和位置
- 审查项目的现有框架、CSS 方案和文件规范
- 以你偏好的格式（CSS、Tailwind、JSON）生成 Token 文件
- 将 Token 集成到项目中，尊重现有的项目规范
- 可选：**Step 3.5** 将 `public/design-assets/` 与 manifest 写入项目
- 展示变更摘要供你审阅

#### 6. 视觉素材生成
*适用于：需要与产品、设计方向一致的配图，而不仅是 Token 的用户。*

在探索或确认方向后，技能会组装 **StyleContext**（产品、页面类型、Token、美学指南），通过 Agent 的**图像生成工具**或 MCP 生成：

- **Hero、功能配图、空状态、OG 图**（P0；短视频为后续阶段）
- 同一概念下**视觉族一致**（先生成 Hero，再以其为风格参考）
- **`design-assets.manifest.json`** —— 路径、角色、alt、迭代 lineage
- 探索阶段嵌入情绪看板；Apply 时复制到 `public/design-assets/`

导航级 UI 图标仍使用图标库或自定义 SVG。详见 [VISUAL-ASSET-GENERATION.md](references/VISUAL-ASSET-GENERATION.md) 与 [visual-asset-e2e.md](assets/examples/visual-asset-e2e.md)。

#### 能力组合

这些能力可自然串联，遵循**探索 → 选择 → 应用**的模式：

```
探索氛围 → 从 3 个概念稿 + 情绪看板中选择 → 提取设计系统 → 预览 → 应用到项目
```

也可灵活混搭 —— 从一个网站提取风格，应用到另一个网站的布局上。Agent 只在你说"应用"时才会修改你的项目。

---

## 安装

**推荐方式 —— 适用于 Claude Code、Codex、Cursor、Gemini CLI、Kimi Code 等任何支持 `npx` 的 Agent：**

```bash
npx skills add MonkeyUI-dev/vibe-to-ui
```

**手动安装（git clone）：**

适用于 **Claude Code** —— 安装到 `~/.claude/skills/`：

```bash
# 首次安装：如果目录不存在，先创建它
mkdir -p ~/.claude/skills

git clone https://github.com/MonkeyUI-dev/vibe-to-ui.git ~/.claude/skills/vibe-to-ui
```

适用于**其他 Agent**（Codex、Cursor、Gemini CLI、Kimi Code 等）—— 安装到 `~/.agents/skills/`：

```bash
# 首次安装：如果目录不存在，先创建它
mkdir -p ~/.agents/skills

git clone https://github.com/MonkeyUI-dev/vibe-to-ui.git ~/.agents/skills/vibe-to-ui
```

---

## 使用示例

```
# 提取设计系统（先生成预览，不修改你的项目）
"分析这张截图的设计，并给我设计 Token"

# 用图片探索视觉风格（生成 3 个概念稿 + 情绪看板）
"我想要一种平静而现代的感觉，有点像斯堪的纳维亚设计 —— 帮我找到一个方向"

# 用音乐探索视觉风格
"我录了一段旋律，它捕捉到了我想要的感觉 —— 你能听一听并将其转化为设计方向吗？"

# 通过歌曲描述探索风格
"我希望我的 UI 给人一种缓慢原声吉他曲的感觉 —— 温暖、不急促、自然"

# 从氛围感觉定义动效
"我想让我的产品给人感觉创新、快速 —— 帮我定义元素应该怎么动"

# 提取布局结构
"我很喜欢这个页面的结构，提取布局以便我复用"

# 将确认的设计应用到项目
"我喜欢概念 B —— 把这个设计应用到我的项目"

# 为概念生成配图（探索阶段，不修改项目）
"为概念 B 生成与产品一致的 Hero 和功能配图"

# 同时应用 Token 与图片
"把概念 B 的设计和素材一起应用到我的 Next.js 项目"

# 完整流程
"我有一些灵感图片和一段音乐片段 —— 先探索风格，再将其应用到我找到的这个布局上"
```



---

## 视觉素材：工具与环境变量

vibe-to-ui **仅包含指令文档**，不内置 API Key，也不直接调用图像 API。由 Agent 使用宿主工具或 MCP。

### Cursor（默认）

技能触发能力 6 时使用内置图像生成；探索阶段保存在情绪看板旁；Apply 时复制到 `public/design-assets/`。

### 可选 MCP / API

在 shell 或 Agent 配置中设置环境变量（勿提交到仓库）：

| 变量 | 说明 |
|------|------|
| `VIBE_IMAGE_PROVIDER` | `host`（默认）、`openai`、`flux`、`ideogram`、`recraft` |
| `OPENAI_API_KEY` | OpenAI 图像模型 |
| `BFL_API_KEY` | Flux API |
| `IDEOGRAM_API_KEY` | Ideogram |
| `RECRAFT_API_KEY` | Recraft |

### 成本与分辨率

- **探索**：预览尺寸（长边约 960px）以控制成本
- **Apply**：用户确认后按最终尺寸重新生成（如 Hero 1920px）
- **重试**：每张图最多 2 次，失败后回退 CSS 占位

---

## 技能结构

```
.
├── SKILL.md                          # 核心指令（激活时加载）
├── references/
│   ├── DESIGN-SYSTEM.md              # 设计系统提取方法论
│   ├── DESIGN-EXPLORATION.md         # 交互式探索对话指南
│   ├── LAYOUT-ANALYSIS.md            # 布局分析与 ASCII 蓝图指南
│   ├── MOTION-SYSTEM.md              # 动效系统提取与生成指南
│   ├── AESTHETIC-ANALYSIS.md         # 美学灵魂捕获方法论
│   ├── ICON-USAGE.md                 # 图标组件指南
│   ├── MOOD-BOARD.md                 # 情绪看板生成指南
│   ├── VISUAL-ASSET-GENERATION.md    # 配图生成与 manifest
│   └── APPLY-DESIGN.md              # 将确认的设计应用到项目指南
└── assets/
    ├── design-system-template.md
    └── examples/
        ├── visual-asset-e2e.md
        └── design-assets.manifest.example.json     # 设计 Token 标准输出模板
```

遵循 [Agent Skills 渐进式披露](https://agentskills.io/specification) 原则：启动时仅加载 `SKILL.md` 元数据（约 100 个 Token），参考文件按需加载，保持上下文精简。

---

## 兼容的 Agent

该技能遵循开放的 [Agent Skills 标准](https://agentskills.io)，兼容任何支持该标准的助手：

Claude Code · GitHub Copilot · Cursor · Gemini CLI · TRAE · 以及更多。

---

## 许可证

MIT —— 详见 [LICENSE](LICENSE)。

由 [MonkeyUI-dev](https://github.com/MonkeyUI-dev) 用 ❤️ 构建。
