Logcat 最坑的地方，不是报错难。是日志太多。你一打开 Android Studio，满屏都在刷。

---

真正在炸的那一行，常常被埋住。所以看 Logcat，别硬盯。先把范围缩小。

---

第一层，只看自己 app。第二层，只看错误。

---

第三层，再按 Tag、关键词、时间继续收窄。再把常用条件存下来。

---

最常用的一条，是 `package:mine`。

---

它只看当前打开项目相关的日志。

---

如果要看错误，就加 `level:ERROR`。完整写法是 `package:mine level:ERROR`。

---

接口失败、空指针、崩溃前异常，都适合从这里看。

---

程序闪退时，直接查 `package:mine is:crash`。想看堆栈，就查 `package:mine is:stacktrace`。

---

如果代码里有 `TAG = "LoginActivity"`，Logcat 里就可以搜 `tag:LoginActivity`。

---

只看这个页面的错误，就搜 `tag:LoginActivity level:ERROR`。Tag 固定以后，定位模块会快很多。

---

你刚点了按钮、刚进页面，或者刚复现 bug，就查 `package:mine age:5m`。旧日志不会再干扰你。

---

我建议你直接收藏几条模板。日常开发，用 `package:mine`。

---

看错误，用 `package:mine level:ERROR`。看闪退，用 `package:mine is:crash`。

---

查某个页面，用 `package:mine tag:MainActivity`。查某个关键词，用 `package:mine message:timeout`。

---

查最近操作，用 `package:mine age:3m`。

---

如果你要查登录页最近五分钟的错误，就用 `package:mine tag:LoginActivity level:ERROR age:5m`。

---

这些模板不是背下来就完事。关键是知道每个字段在干什么。

---

`package:` 是按包名筛。最常见就是 `package:mine`。

---

`level:` 是按日志级别筛。常见级别有 VERBOSE、DEBUG、INFO、WARN、ERROR、ASSERT。

---

你查 `level:ERROR`，就是只看错误和更严重的问题。

---

`tag:` 是按日志 Tag 筛。

---

比如 `tag:Network`，就只盯网络模块。

---

`message:` 是按日志内容里的关键词筛。比如 `message:timeout`。

---

`age:` 是按时间筛。

---

`age:30s` 是最近三十秒。`age:5m` 是最近五分钟。`age:1h` 是最近一小时。

---

`is:crash` 专门看崩溃。`is:stacktrace` 专门看异常堆栈。

---

真正好用的是组合查询。

---

比如 `package:mine tag:LoginActivity level:ERROR age:5m`。

---

这条同时限制四件事。

---

查业务问题时，这种组合最实用。

---

如果某个 Tag 一直刷屏，也可以排除它。

---

比如 `package:mine -tag:OpenGLRenderer`。它保留当前项目日志，但把 OpenGLRenderer 相关日志去掉。

---

系统日志、渲染日志刷屏时，这招很有用。

---

再复杂一点，你可以同时看多个模块。

---

比如 `(tag:LoginActivity | tag:AuthRepo) & level:ERROR & package:mine`。这就是看 LoginActivity 或 AuthRepo。

---

登录、支付、网络请求这种链路，适合这样查。

---

Mac 上看 Logcat，还有几个按钮要会用。

---

Pause 是暂停日志滚动。日志刷太快，看不清时，先按它。

---

你也可以停在当前界面慢慢看。

---

Clear 是清空当前窗口。

---

正确姿势是先 Clear，再复现 bug。

---

这样新出现的日志就很干净。

---

Soft Wrap 是长日志自动换行。接口返回很长，或者堆栈一行太长时，打开它会舒服很多。

---

New Tab 和 Split 是开新标签或分屏。

---

一个窗口看全部日志，另一个窗口只看错误日志。对比起来会方便很多。

---

来看几个新手场景。

---

你点了按钮没反应。

---

先点 Clear。

---

再复现一次问题。

---

然后输入 `package:mine age:2m`。

---

如果日志还是多，继续收窄成 `package:mine level:ERROR age:2m`。

---

这样就是按最近两分钟和错误级别一起筛。

---

如果程序闪退。

---

先输入 `package:mine is:crash`。

---

重点找 `FATAL EXCEPTION`。

---

再找 `Caused by:`。

---

还要找第一个指向你自己代码文件的行号。

---

真正有用的信息，通常不是最上面那一行。

---

`Caused by` 后面的原因，和你自己代码的行号，更值得看。

---

如果是网络请求失败。

---

建议你自己统一一个网络 Tag。

---

比如 `TAG = "API"`。

---

请求开始打 `request start`。

---

请求失败打 `request fail`，并把异常传进去。

---

然后 Logcat 里直接查 `tag:API`。

---

只看错误，就查 `tag:API level:ERROR`。

---

这样请求开始、成功、失败、异常，会在一条线上。

---

日志写得好，后面排查会轻松很多。

---

Tag 要固定，也要有意义。

---

别写 `aaa`、`bbb` 这种 Tag。

---

你过两天回来，自己都不知道它是谁。

---

推荐写 `LoginActivity`、`Network`、`Order` 这种。

---

后面就能直接按 Tag 搜。

---

团队里别人也看得懂。

---

错误日志优先用 `Log.e`。

---

比如 `Log.e("Network", "request failed", e)`。

---

这样你用 `level:ERROR` 一筛，问题日志就出来了。

---

普通调试日志和真正错误，也更容易分开。

---

还要记得打关键上下文。

---

比如提交订单时，不要只写 `submit`。

---

写成 `submit order, userId=$userId, productId=$productId`。

---

这样你回头一看，就知道是哪个用户。

---

也知道提交了哪个商品。

---

当时传了哪些参数，也能看见。

---

如果你现在只想记三条。

---

那就记 `package:mine`。

---

再记 `package:mine level:ERROR`。

---

再记 `package:mine is:crash`。

---

第一条看自己项目。

---

第二条看自己项目的错误。

---

第三条看自己项目的崩溃。

---

这三条已经能解决很多新手调试问题。

---

这里留一个速查版。

---

看当前项目：`package:mine`。

---

看当前项目错误：`package:mine level:ERROR`。

---

看当前项目崩溃：`package:mine is:crash`。

---

看某个页面：`package:mine tag:MainActivity`。

---

看某个关键词：`package:mine message:timeout`。

---

看最近五分钟：`package:mine age:5m`。

---

看某模块最近五分钟错误：`package:mine tag:LoginActivity level:ERROR age:5m`。

---

排除刷屏 Tag：`package:mine -tag:OpenGLRenderer`。

---

Logcat 不怕日志多。

---

怕的是你没有筛选方法。

---

以后别硬看整屏日志。

---

先缩小范围，再找错误点。
