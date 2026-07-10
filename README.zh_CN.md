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

面向 vibe coding 开发者的设计助手。将截图、情绪图片、非 UI 灵感、音乐和直觉感受转化为结构化的设计系统、动效语言、C 端 App UIUX 系统、视觉素材方向与符合产品语境的空间布局 —— 默认会结合你的产品背景生成 **3 个视觉方向**，再正式整理 Token，让结果先可见、可比较，而不是过早锁定。所有探索都通过独立的预览页面协作完成，只有当你准备好时才会将设计应用到项目。

**七大核心能力：**

#### 1. 设计系统提取
*适用于：拥有完整设计稿需要还原风格的用户。*

提供一张 UI 截图或设计稿，该技能将提取其完整的"风格 DNA"并生成一个**独立预览页面**供你评估 —— 在你确认之前不会修改你的项目：

- **颜色** —— 带语义角色（主色、背景色、文字色、边框色等）
- **排版** —— 字体族、字号比例、字重、行高
- **间距** —— 基础单位与一致的倍数比例
- **圆角** —— 各组件的圆角策略
- **阴影** —— 层级投影系统
- **动效** —— 节奏、缓动曲线、动效密度、触发方式、减少动画适配
- **C 端 App UIUX** —— 当页面类型是 Consumer app 时，补充导航模型、主循环、状态矩阵、触感反馈与移动端优先预览要求

输出三种格式的设计 Token：**CSS 自定义属性**、**Tailwind CSS 配置**和 **JSON Token 文件** —— 仅在你确认预览后才应用到项目。

如果你想要的是**还原或接近复制**，使用这条路径。如果你希望将参考图扩展为适合自己产品的 **3 个可能方向**，应先进入设计探索。

#### 2. 设计探索
*适用于：只有一种模糊感觉的用户。*

不确定想要什么风格？或者已经有参考图，但希望它基于你的产品背景转化为 **3 个视觉方向**，而不是被字面复制？该技能将引导你完成互动对话：

1. 说明你的项目用途和目标用户
2. 上传任意灵感图片（风景、物体、其他应用 —— 任何东西皆可）**或音乐录音**（音频片段、哼唱旋律、歌曲片段）
3. 技能将视觉信号与音频信号一同转化为设计特质 —— 节奏、音色和韵律会映射为 UI 中的活力感、温度感和质感
4. 将排版作为独立维度探索：标题/正文搭配、可读性姿态、层级感觉和多语言 fallback
5. 综合生成 **3 个不同的设计概念** —— 每个都有独立的视觉风格**和动效个性**；如果存在具体参考，也会保留其页面类型和结构气质
6. 为每个概念生成**独立概念预览页面**（使用符合页面类型的过渡和入场动画）以及**情绪看板**；如果是 C 端 App，会包含导航、核心屏、详情/创建流程、非 happy path 状态与触感动效
7. 你进行反馈、比较与选择 —— 或混合不同概念的元素，包括跨方向组合排版
8. 确定方向后，将其正式整理为包含动效 Token 的完整设计系统及预览页面
9. 确认后，将设计应用到你的项目（通过能力 5 实现）

#### 3. 空间氛围探索
*适用于：能感觉到页面应该是什么气质，但还说不清布局该如何组织的用户。*

想让落地页更松弛、更像杂志、更有电影感、更开阔，或者明确不想像通用 SaaS 模板？你可以提供模糊意图，也可以提供来自任何地方的灵感：

- 摄影、风景、建筑、室内空间
- 杂志、海报、包装、时装
- 专辑封面、电影画面、插画
- 音乐或视频参考

该技能会把这些参考翻译为可迁移的空间信号：内容密度、留白、层级、主视觉焦点、空间节奏、卡片使用、图像行为、区块转场、交互节奏和响应式策略。非 UI 灵感不会被字面复制：例如海岸公路照片可以转译为开阔感、大面积负空间、缓慢节奏和克制密度，而不是“把公路照片放进首屏”。

随后，技能会结合产品目标和 UX 约束动态推导页面的 **Spatial DNA（空间 DNA）**，并在修改生产代码前生成 **3 个真正不同的独立布局方向预览**。每个方向都应具备同等粒度：用户可读的小型布局草图、标签/内容映射、区块顺序、空间节奏、取舍风险和响应式姿态。

#### 4. 情绪看板生成
*适用于：在锁定 Token 之前需要可分享视觉方向的用户。*

将灵感与审美信号整理为**独立 HTML 情绪看板**，把方向变成可感知、可分享的视觉材料：

- 将参考整理成一个连贯的视觉故事，而不是随机拼贴
- 同时展示色彩故事、排版气质、纹理/材质线索和动效暗示
- 保持看板与实际页面类型一致，避免漂移到错误的产品表面
- 允许并排比较多个方向，再正式整理设计系统

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

- **Hero、功能配图、空状态、OG 图**
- 同一概念下**视觉族一致**（先生成 Hero，再以其为风格参考）
- **按角色区分图标策略** —— UI 小图标锁定单一图标库，自定义 SVG 作为 fallback，营销/社媒图标可生成插画族
- **Review + Placement 流程** —— contact sheet、mood board wall、placement preview、安全区与 manifest 校验后再 Apply
- **`design-assets.manifest.json`** —— 路径、角色、alt、迭代 lineage
- 探索阶段嵌入情绪看板；Apply 时复制到 `public/design-assets/`

导航级 UI 图标仍使用单一锁定图标库或自定义 SVG；功能卖点图标、3D 物件图标、社媒传播图可使用生成式 SVG/PNG/WebP 视觉族。详见 [ICON-USAGE.md](references/ICON-USAGE.md)、[VISUAL-ASSET-GENERATION.md](references/VISUAL-ASSET-GENERATION.md) 与 [visual-asset-e2e.md](assets/examples/visual-asset-e2e.md)。

#### 7. 本地 Design Context（Profile + Targets）
*适用于：需要跨项目、跨媒介复用品牌视觉记忆的用户。*

从**网站 URL 或截图**提取品牌视觉语言，并持久化到 `~/.vibe-to-ui/profiles/<profile>/` —— 与 Skill 包分离，安装/更新不会覆盖你的数据：

- **Profile** = 一套品牌、产品或客户（如 `vibe-to-ui`、`nextai`），不是产出平台
- 共享品牌母版：`profile.yaml`、`brand.md`、`tokens.json`、`decisions.md`、`assets/`、`sources/`
- **按需 Target**（`web`、`social-cover`、`hyperframes`）：首次请求时创建，之后优先复用与更新
- 将品牌母版、Tokens、设计决策与对应 target 规则合并，交给网页、社媒封面或 Launch 视频 Agent

```bash
vibe-to-ui context --profile <profile> --target web|social-cover|hyperframes
```

详见 [DESIGN-CONTEXT.md](references/DESIGN-CONTEXT.md) 与 [design-context-e2e.md](assets/examples/design-context-e2e.md)。本 MVP 暂不实现云同步、团队协作与向量检索。

#### C 端 App UIUX 场景

当目标是 Consumer app / C 端 App 时，vibe-to-ui 会将其作为一等开发场景处理，而不只是页面类型标签：

- 识别平台、生命周期阶段、主循环、导航模型、手势模型与状态风险
- 预览必须覆盖导航、首页/feed 或核心任务屏、详情/创建流程、非 happy path 状态与触感动效
- 输出 loading、empty、error、offline、success 的状态矩阵
- 生成素材默认放在 onboarding、空状态、徽章/成就、分享卡等产品内安全位置
- UI chrome 图标保持矢量和可主题化；表达性插画素材只用于能提升记忆点和动机的位置

详见 [CONSUMER-APP-DESIGN.md](references/CONSUMER-APP-DESIGN.md) 与完整 E2E 示例 [consumer-app-e2e.md](assets/examples/consumer-app-e2e.md)。

#### 能力组合

这些能力可自然串联，遵循**探索 → 选择 → 应用**的模式：

```
产品背景 + 参考 → 得到 3 个语境化视觉方向 → 从概念预览 + 情绪看板中选择 → 提取设计系统 → 预览 → 应用到项目
```

也可灵活混搭 —— 用一个参考提供结构，用另一个参考提供氛围，再把两者翻译成符合产品目标的空间方向。Agent 只在你说"应用"时才会修改你的项目。

---

## 安装

**推荐方式 —— 适用于 Claude Code、Codex、Cursor、Gemini CLI、Kimi Code 等任何支持 `npx` 的 Agent：**

```bash
npx skills add MonkeyUI-dev/vibe-to-ui#v0.3.0
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

# 探索空间氛围
"我喜欢这家咖啡馆、这张电影截图和这张专辑封面的感觉 —— 让我的落地页更像杂志，但不要像通用 SaaS 页面"

# 将确认的设计应用到项目
"我喜欢概念 B —— 把这个设计应用到我的项目"

# 为概念生成配图（探索阶段，不修改项目）
"为概念 B 生成与产品一致的 Hero 和功能配图"

# 生成表达性图标族
"为概念 B 生成 3D 功能图标，但 App 导航图标继续使用 Lucide"

# 探索 C 端 App 体验
"为我的习惯追踪 App 设计 3 个视觉/UIUX 方向，包含 onboarding、底部导航、空状态和触感动效"

# 同时应用 Token 与图片
"把概念 B 的设计和素材一起应用到我的 Next.js 项目"

# 从 URL 或截图保存本地 Design Context profile
"把 https://nextai.example 的设计上下文提取到 profile nextai"

# 按需加载或生成媒介规则
"vibe-to-ui context --profile nextai --target web"
"vibe-to-ui context --profile nextai --target social-cover"
"vibe-to-ui context --profile nextai --target hyperframes"

# 完整流程
"我有一些灵感图片和一段音乐片段 —— 先探索空间氛围，选定方向后再应用到我的产品"
```



---

## 视觉素材：工具与环境变量

vibe-to-ui **仅包含指令文档**，不内置 API Key，也不直接调用图像 API。由 Agent 使用宿主工具或 MCP。

当项目中存在 `DESIGN.md` 时，技能会被动记录视觉决策：锁定的 UI 图标库、自定义 SVG fallback、插画图标 preset、视觉族规则、manifest 路径、已确认素材与迭代记录。

### 宿主图像工具（默认）

技能触发能力 6 时使用 Agent 宿主提供的内置图像生成工具；探索阶段保存在情绪看板旁；Apply 时复制到 `public/design-assets/`。

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
│   ├── SPATIAL-VIBE.md               # 感受驱动的布局探索指南
│   ├── MOTION-SYSTEM.md              # 动效系统提取与生成指南
│   ├── MOTION-ENGINE-ROUTER.md       # 渐进加载动效引擎路由（Web/React/Vue × L1–L4）
│   ├── AESTHETIC-ANALYSIS.md         # 美学灵魂捕获方法论
│   ├── CONTEXT-COLLABORATION.md      # DESIGN.md 协作协议
│   ├── DESIGN-CONTEXT.md             # 本地 Design Context profile + targets MVP
│   ├── ICON-USAGE.md                 # 图标组件指南
│   ├── MOOD-BOARD.md                 # 情绪看板生成指南
│   ├── CONSUMER-APP-DESIGN.md        # Consumer app / C 端 UIUX 场景指南
│   ├── VISUAL-ASSET-GENERATION.md    # 配图生成与 manifest
│   └── APPLY-DESIGN.md              # 将确认的设计应用到项目指南
└── assets/
    ├── DESIGN.md                     # 持久化产品/设计上下文模板
    ├── design-system-template.md     # 设计 Token 标准输出模板
    ├── design-context/               # ~/.vibe-to-ui/profiles/ 的种子模板
    │   ├── profile.yaml
    │   ├── brand.md
    │   ├── tokens.json
    │   ├── decisions.md
    │   ├── sources/
    │   └── targets/                  # web | social-cover | hyperframes 种子
    └── examples/
        ├── visual-asset-e2e.md
        ├── consumer-app-e2e.md
        ├── design-context-e2e.md
        └── design-assets.manifest.example.json
```

用户 Design Context 数据位于 `~/.vibe-to-ui/profiles/<profile>/`，**不属于**本技能包；Skill 更新不会覆盖它。

遵循 [Agent Skills 渐进式披露](https://agentskills.io/specification) 原则：启动时仅加载 `SKILL.md` 元数据（约 100 个 Token），参考文件按需加载，保持上下文精简。

---

## 兼容的 Agent

该技能遵循开放的 [Agent Skills 标准](https://agentskills.io)，兼容任何支持该标准的助手：

Claude Code · GitHub Copilot · Cursor · Gemini CLI · TRAE · 以及更多。

---

## 许可证

MIT —— 详见 [LICENSE](LICENSE)。

由 [MonkeyUI-dev](https://github.com/MonkeyUI-dev) 用 ❤️ 构建。
