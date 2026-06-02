# Video Outline

> **主题**：`blueprint`（试用）—— 深藏青底 + 青色强调色 + IBM Plex Mono，工程蓝图 / 工业图纸气质
> **总时长**：约 13 分 00 秒（按 outline step 估算）
> **章节数**：17 章 / 106 步

---

## 1. logcat-problem — 别硬盯满屏日志（8 steps · ~60s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 问题：Logcat 日志太多，不知道怎么快速定位错误 —— 来源 article §开头 / L3
- 顺序：只看自己 app、错误级别、Tag 或关键词、保存过滤条件 —— 来源 article §1 / L9-L14
- 结论：掌握几个查询方式，能解决大部分排错问题 —— 来源 article §1 / L16

**开发计划**：

- step 1 (~7s) — 满屏 Logcat 噪声 + 主标语“不是报错难，是日志太多”
- step 2 (~7s) — Android Studio / Logcat 场景 + 系统、其他进程、旧日志
- step 3 (~7s) — 被埋住的错误行作为画面中心
- step 4 (~7s) — 大字提醒“别硬盯，先缩小范围”
- step 5 (~8s) — 筛选顺序第一层：只看自己 app
- step 6 (~8s) — 筛选顺序第二层：只看错误
- step 7 (~8s) — 筛选顺序第三层：Tag / 关键词 / 时间
- step 8 (~8s) — 收藏过滤条件 + “很多问题不用猜”

口播节选：
> Logcat 最坑的地方，不是报错难。是日志太多。

---

## 2. filter-package-error — 当前项目和错误日志（5 steps · ~38s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- `package:mine`：只显示当前打开项目相关日志 —— 来源 article §2.1 / L22-L28
- `package:mine level:ERROR`：只看当前项目中的错误日志 —— 来源 article §2.2 / L32-L39
- `level:ERROR`：表示 Error 级别及更严重级别 —— 来源 article §2.2 / L40-L42

**开发计划**：

- step 1 (~7s) — 查询栏中显示 `package:mine`
- step 2 (~8s) — 当前项目日志与外部杂音的对比内容
- step 3 (~7s) — 查询栏中追加 `level:ERROR`
- step 4 (~8s) — 完整查询 `package:mine level:ERROR`
- step 5 (~8s) — 错误场景标签：接口失败 / 空指针 / 崩溃前异常

口播节选：
> 最常用的一条，是 `package:mine`。如果要看错误，就加 `level:ERROR`。

---

## 3. filter-crash-tag-age — 崩溃、模块和时间（4 steps · ~32s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- `package:mine is:crash`：程序闪退时筛选崩溃日志 —— 来源 article §2.3 / L46-L52
- `package:mine is:stacktrace`：查看异常堆栈 —— 来源 article §2.3 / L54-L58
- `tag:LoginActivity` / `tag:LoginActivity level:ERROR`：按页面或模块筛选 —— 来源 article §2.4 / L62-L80
- `package:mine age:5m`：只显示最近 5 分钟日志 —— 来源 article §2.5 / L85-L98

**开发计划**：

- step 1 (~8s) — 崩溃查询 `package:mine is:crash` 与堆栈查询 `package:mine is:stacktrace`
- step 2 (~8s) — Kotlin `TAG = "LoginActivity"` 代码片段 + `tag:LoginActivity`
- step 3 (~8s) — 页面错误查询 `tag:LoginActivity level:ERROR`
- step 4 (~8s) — 最近操作查询 `package:mine age:5m`

口播节选：
> 程序闪退时，直接查 `package:mine is:crash`。Tag 固定以后，定位模块会快很多。

---

## 4. saved-templates-core — 先收藏三条核心模板（4 steps · ~32s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 日常开发模板：`package:mine` —— 来源 article §3 / L102-L108
- 错误模板：`package:mine level:ERROR` —— 来源 article §3 / L110-L114
- 闪退模板：`package:mine is:crash` —— 来源 article §3 / L116-L120

**开发计划**：

- step 1 (~8s) — “收藏模板”主标题 + 日常开发 `package:mine`
- step 2 (~8s) — 看错误：`package:mine level:ERROR`
- step 3 (~8s) — 看闪退：`package:mine is:crash`
- step 4 (~8s) — 三条核心模板并列

口播节选：
> 我建议你直接收藏几条模板。日常开发，用 `package:mine`。

---

## 5. saved-templates-search — 页面、关键词和最近操作（4 steps · ~32s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 页面模板：`package:mine tag:MainActivity` —— 来源 article §3 / L122-L126
- 关键词模板：`package:mine message:timeout` —— 来源 article §3 / L128-L132
- 最近操作模板：`package:mine age:3m` —— 来源 article §3 / L134-L138
- 组合模板：`package:mine tag:LoginActivity level:ERROR age:5m` —— 来源 article §3 / L140-L144

**开发计划**：

- step 1 (~8s) — 查页面和查关键词的两条模板
- step 2 (~8s) — 查最近操作：`package:mine age:3m`
- step 3 (~9s) — 登录页最近五分钟错误的完整组合查询
- step 4 (~7s) — “模板背后是字段含义”过渡画面

口播节选：
> 查某个页面，用 `package:mine tag:MainActivity`。查某个关键词，用 `package:mine message:timeout`。

---

## 6. fields-core — package、level、tag（5 steps · ~38s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- `package:`：按包名筛选日志，常用 `package:mine` —— 来源 article §4 / L148-L157
- `level:`：日志级别包括 VERBOSE、DEBUG、INFO、WARN、ERROR、ASSERT —— 来源 article §4 / L161-L170
- `tag:`：按日志 Tag 筛选，例如 `tag:Network` —— 来源 article §4 / L180-L187

**开发计划**：

- step 1 (~7s) — `package:` 字段卡 + 按包名筛
- step 2 (~7s) — `package:mine` 作为最常见写法
- step 3 (~9s) — `level:` 字段卡 + 日志级别列表
- step 4 (~8s) — `level:ERROR` 与“错误和更严重问题”
- step 5 (~7s) — `tag:` 字段卡 + `tag:Network`

口播节选：
> `package:` 是按包名筛。`level:` 是按日志级别筛。`tag:` 是按日志 Tag 筛。

---

## 7. fields-search-time-exception — message、age 和 is（5 steps · ~39s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- `message:`：按日志内容中的关键词筛选，例如 `message:timeout` —— 来源 article §4 / L191-L198
- 关键词：timeout、failed、null、exception —— 来源 article §4 / L200-L205
- `age:`：支持 `age:30s`、`age:5m`、`age:1h` —— 来源 article §4 / L208-L220
- `is:crash` / `is:stacktrace`：筛选崩溃日志和异常堆栈 —— 来源 article §4 / L224-L238

**开发计划**：

- step 1 (~8s) — `message:` 字段卡 + `message:timeout`
- step 2 (~8s) — failed / null / exception 关键词组
- step 3 (~9s) — `age:30s` / `age:5m` / `age:1h` 时间组
- step 4 (~7s) — `is:crash` 崩溃入口
- step 5 (~7s) — `is:stacktrace` 异常堆栈入口

口播节选：
> `message:` 是按日志内容里的关键词筛。`age:` 是按时间筛。

---

## 8. query-combine — 组合查询最实用（4 steps · ~31s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 组合查询示例：`package:mine tag:LoginActivity level:ERROR age:5m` —— 来源 article §5 / L242-L250
- 含义：当前项目、LoginActivity 模块、Error 级别、最近 5 分钟 —— 来源 article §5 / L252-L256
- 评价：这种组合查询是最实用的 —— 来源 article §5 / L258

**开发计划**：

- step 1 (~7s) — “真正好用的是组合查询”
- step 2 (~8s) — 完整组合查询 `package:mine tag:LoginActivity level:ERROR age:5m`
- step 3 (~9s) — 四个筛选条件：当前项目 / 模块 / Error / 最近五分钟
- step 4 (~7s) — 业务问题定位面板

口播节选：
> 比如 `package:mine tag:LoginActivity level:ERROR age:5m`。这条同时限制四件事。

---

## 9. query-exclude-complex — 排除刷屏和查业务链路（6 steps · ~47s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 排除 Tag 示例：`package:mine -tag:OpenGLRenderer` —— 来源 article §6 / L262-L268
- 作用：保留当前项目日志，但排除 `OpenGLRenderer` 相关日志 —— 来源 article §6 / L270-L274
- 复杂查询示例：`(tag:LoginActivity | tag:AuthRepo) & level:ERROR & package:mine` —— 来源 article §7 / L278-L284
- 适用链路：登录流程、支付流程、网络请求流程 —— 来源 article §7 / L286-L291

**开发计划**：

- step 1 (~7s) — “某个 Tag 一直刷屏”场景
- step 2 (~8s) — 排除查询 `package:mine -tag:OpenGLRenderer`
- step 3 (~8s) — 当前项目日志保留 + OpenGLRenderer 被排除
- step 4 (~7s) — 系统日志 / 渲染日志刷屏提示
- step 5 (~9s) — 复杂查询 `(tag:LoginActivity | tag:AuthRepo) & level:ERROR & package:mine`
- step 6 (~8s) — 登录 / 支付 / 网络请求链路

口播节选：
> 如果某个 Tag 一直刷屏，也可以排除它。再复杂一点，你可以同时看多个模块。

---

## 10. logcat-buttons — Mac 上几个有用按钮（8 steps · ~56s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- Pause：暂停日志滚动，适合日志滚太快、想停在当前界面 —— 来源 article §8 / L295-L303
- Clear：清空当前日志窗口，适合先清空再复现 bug —— 来源 article §8 / L306-L314
- Soft Wrap：长日志自动换行，适合长接口返回和长堆栈 —— 来源 article §8 / L318-L325
- New Tab / Split：一个窗口看全部日志，一个窗口只看错误日志 —— 来源 article §8 / L328-L335

**开发计划**：

- step 1 (~7s) — Android Studio Logcat 工具栏视图
- step 2 (~7s) — Pause 按钮 + “日志滚太快”
- step 3 (~7s) — 停在当前界面慢慢看
- step 4 (~7s) — Clear 按钮 + “先清空”
- step 5 (~7s) — 复现 bug 后的新日志区域
- step 6 (~7s) — Soft Wrap 按钮 + 长接口返回 / 长堆栈
- step 7 (~7s) — New Tab / Split 按钮
- step 8 (~7s) — 全部日志窗口与错误日志窗口并排

口播节选：
> Pause 是暂停日志滚动。Clear 是清空当前窗口。

---

## 11. scenario-click — 点按钮没反应怎么查（7 steps · ~49s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 场景：点击按钮没反应 —— 来源 article §9 场景 1 / L338-L340
- 步骤：先点 Clear，再复现问题 —— 来源 article §9 场景 1 / L342-L346
- 查询：`package:mine age:2m`，日志多时收窄到 `package:mine level:ERROR age:2m` —— 来源 article §9 场景 1 / L348-L356

**开发计划**：

- step 1 (~7s) — 场景卡：点击按钮没反应
- step 2 (~7s) — 操作一：Clear
- step 3 (~7s) — 操作二：复现问题
- step 4 (~7s) — 查询栏 `package:mine age:2m`
- step 5 (~7s) — 新日志仍然很多的状态
- step 6 (~7s) — 查询栏 `package:mine level:ERROR age:2m`
- step 7 (~7s) — 时间 + 错误双重收窄的结果区域

口播节选：
> 你点了按钮没反应。先点 Clear。再复现一次问题。

---

## 12. scenario-crash — 程序闪退看哪里（8 steps · ~56s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 闪退查询：`package:mine is:crash` —— 来源 article §9 场景 2 / L360-L366
- 重点关键词：`FATAL EXCEPTION`、`Caused by:`、自己包名下代码行 —— 来源 article §9 场景 2 / L368-L371
- 有用信息：`Caused by` 后面的异常原因、第一个指向自己代码文件的行号 —— 来源 article §9 场景 2 / L373-L375

**开发计划**：

- step 1 (~7s) — 场景卡：程序闪退
- step 2 (~7s) — 查询栏 `package:mine is:crash`
- step 3 (~7s) — `FATAL EXCEPTION` 关键词
- step 4 (~7s) — `Caused by:` 关键词
- step 5 (~7s) — 自己包名下的代码行
- step 6 (~7s) — “不是最上面那一行”提示
- step 7 (~7s) — 异常原因区域
- step 8 (~7s) — 第一个自己代码行号区域

口播节选：
> 如果程序闪退，先输入 `package:mine is:crash`。重点找 `FATAL EXCEPTION`。

---

## 13. scenario-network — 网络请求失败怎么查（8 steps · ~58s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 网络 Tag 建议：统一打 `TAG = "API"` —— 来源 article §9 场景 3 / L379-L386
- 查询方式：`tag:API` 或 `tag:API level:ERROR` —— 来源 article §9 场景 3 / L389-L399
- 目的：一眼看到请求开始、成功、失败、异常 —— 来源 article §9 场景 3 / L401

**开发计划**：

- step 1 (~7s) — 场景卡：网络请求失败
- step 2 (~7s) — `TAG = "API"` 代码片段
- step 3 (~7s) — `request start` 日志内容
- step 4 (~8s) — `request fail` + 异常对象
- step 5 (~7s) — 查询栏 `tag:API`
- step 6 (~7s) — 查询栏 `tag:API level:ERROR`
- step 7 (~7s) — 请求开始 / 成功 / 失败 / 异常四个状态
- step 8 (~8s) — 网络链路日志面板

口播节选：
> 如果是网络请求失败，建议你自己统一一个网络 Tag。

---

## 14. write-good-tags — 日志 Tag 要固定、有意义（7 steps · ~49s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 不推荐示例：`Log.d("aaa", "clicked")`、`Log.e("bbb", "fail")` —— 来源 article §10.1 / L407-L414
- 推荐示例：`TAG = "LoginActivity"`、`Log.d(TAG, "click login")`、`Log.e(TAG, "login failed: $msg")` —— 来源 article §10.1 / L416-L422
- 好处：按 Tag 搜、不容易忘记属于哪个模块、团队协作看得懂 —— 来源 article §10.1 / L424-L427

**开发计划**：

- step 1 (~7s) — 主标语“日志写得好，排查轻松很多”
- step 2 (~7s) — `aaa` / `bbb` 反例代码
- step 3 (~7s) — “过两天自己都不知道它是谁”
- step 4 (~7s) — `LoginActivity` / `Network` / `Order` 推荐 Tag
- step 5 (~7s) — 推荐代码片段 `TAG = "LoginActivity"`
- step 6 (~7s) — 可直接按 Tag 搜
- step 7 (~7s) — 团队协作可读性提示

口播节选：
> Tag 要固定，也要有意义。别写 `aaa`、`bbb` 这种 Tag。

---

## 15. write-errors-context — 错误级别和上下文（8 steps · ~58s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 错误日志建议：优先用 `Log.e("Network", "request failed", e)` —— 来源 article §10.2 / L431-L437
- 好处：可以直接用 `level:ERROR` 筛出来，区分问题日志和普通调试日志 —— 来源 article §10.2 / L439-L441
- 上下文示例：`submit order, userId=$userId, productId=$productId` 优于 `submit` —— 来源 article §10.3 / L445-L457
- 上下文价值：知道用户、商品、当时参数 —— 来源 article §10.3 / L459-L464

**开发计划**：

- step 1 (~7s) — `Log.e` 主提示
- step 2 (~7s) — `Log.e("Network", "request failed", e)` 代码片段
- step 3 (~7s) — 查询栏 `level:ERROR`
- step 4 (~7s) — 普通调试日志与问题日志分区
- step 5 (~7s) — 反例 `Log.d("Order", "submit")`
- step 6 (~8s) — 推荐 `submit order, userId=$userId, productId=$productId`
- step 7 (~7s) — userId / productId / 参数三个信息点
- step 8 (~8s) — “回头一看就知道当时发生了什么”

口播节选：
> 错误日志优先用 `Log.e`。还要记得打关键上下文。

---

## 16. three-commands — 新手先记三条命令（7 steps · ~49s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 三条命令：`package:mine`、`package:mine level:ERROR`、`package:mine is:crash` —— 来源 article §11 / L468-L476
- 解释：看自己项目、看自己项目错误、看自己项目崩溃 —— 来源 article §11 / L478-L481
- 评价：足够解决大部分新手调试问题 —— 来源 article §11 / L483

**开发计划**：

- step 1 (~7s) — “只想先记三条”主标题
- step 2 (~7s) — `package:mine`
- step 3 (~7s) — `package:mine level:ERROR`
- step 4 (~7s) — `package:mine is:crash`
- step 5 (~7s) — 第一条：自己项目
- step 6 (~7s) — 第二条：自己项目错误
- step 7 (~7s) — 第三条：自己项目崩溃

口播节选：
> 如果你现在只想记三条。那就记 `package:mine`。

---

## 17. cheat-sheet-close — 速查版和收束（8 steps · ~56s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 速查命令：当前项目、错误、崩溃、页面、关键词、最近 5 分钟、某模块错误、排除刷屏 Tag —— 来源 article §13 / L503-L529
- 核心句：Logcat 不怕日志多，怕的是没有筛选方法 —— 来源 article §12 / L487-L489
- 收束动作：不要硬看整屏日志，先缩小范围，再找错误点 —— 来源 article §12 / L491-L499

**开发计划**：

- step 1 (~7s) — 速查版标题 + 命令清单容器
- step 2 (~7s) — 当前项目 / 当前项目错误 / 当前项目崩溃三条
- step 3 (~7s) — 页面 / 关键词 / 最近五分钟三条
- step 4 (~7s) — 某模块最近五分钟错误的完整命令
- step 5 (~7s) — 排除刷屏 Tag：`package:mine -tag:OpenGLRenderer`
- step 6 (~7s) — “Logcat 不怕日志多”
- step 7 (~7s) — “怕的是没有筛选方法”
- step 8 (~7s) — “先缩小范围，再找错误点”

口播节选：
> Logcat 不怕日志多。怕的是你没有筛选方法。

---

## 素材清单

### 1. logcat-problem
- ⚠️ Android Studio Logcat 满屏日志截图（待提供，可用 placeholder）
- ✓ 查询字段文本素材来自 article.md

### 2. filter-package-error
- ⚠️ Logcat 查询栏截图或录屏片段（待提供，可用 placeholder）
- ✓ `package:mine` / `level:ERROR` 命令片段来自 article.md

### 3. filter-crash-tag-age
- ⚠️ 崩溃日志、Tag 查询、最近时间查询的 Logcat 截图（待提供，可用 placeholder）
- ✓ Kotlin / text 命令片段来自 article.md

### 4. saved-templates-core
- ✓ 三条核心查询模板来自 article.md
- ⚠️ 收藏过滤条件的真实 UI 截图（待提供，可用 placeholder）

### 5. saved-templates-search
- ✓ 页面、关键词、最近操作、组合查询模板来自 article.md
- ⚠️ 查询模板列表截图（待提供，可用 placeholder）

### 6. fields-core
- ✓ `package:` / `level:` / `tag:` 字段解释来自 article.md
- ⚠️ Logcat 字段提示 UI 截图（待提供，可用 placeholder）

### 7. fields-search-time-exception
- ✓ `message:` / `age:` / `is:` 字段解释来自 article.md
- ⚠️ 异常堆栈示例截图（待提供，可用 placeholder）

### 8. query-combine
- ✓ 组合查询文本来自 article.md
- ⚠️ LoginActivity 最近五分钟错误查询截图（待提供，可用 placeholder）

### 9. query-exclude-complex
- ✓ 排除查询和复杂查询文本来自 article.md
- ⚠️ 业务链路示例截图（待提供，可用 placeholder）

### 10. logcat-buttons
- ⚠️ Pause / Clear / Soft Wrap / New Tab / Split 的工具栏截图（待提供，可用 placeholder）
- ✓ 按钮用途文本来自 article.md

### 11. scenario-click
- ⚠️ “点击按钮没反应”的复现场景截图（待提供，可用 placeholder）
- ✓ 查询命令来自 article.md

### 12. scenario-crash
- ⚠️ 含 `FATAL EXCEPTION` / `Caused by` 的示例崩溃日志截图（待提供，可用 placeholder）
- ✓ 关键词与排查顺序来自 article.md

### 13. scenario-network
- ⚠️ 网络请求日志真实示例（待提供，可用 placeholder）
- ✓ API Tag 代码片段来自 article.md

### 14. write-good-tags
- ✓ 正反代码片段来自 article.md
- ⚠️ 团队日志规范文档截图（可选）

### 15. write-errors-context
- ✓ `Log.e` 与上下文代码片段来自 article.md
- ⚠️ 订单日志真实示例（待提供，可用 placeholder）

### 16. three-commands
- ✓ 三条新手命令来自 article.md

### 17. cheat-sheet-close
- ✓ 速查版命令来自 article.md
- ⚠️ 最终可下载速查图背景素材（可选）
