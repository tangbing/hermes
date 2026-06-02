# Android Studio Logcat 使用指南

使用 Android Studio 调试应用时，Logcat 日志太多，不知道怎么快速定位错误，总结一下

---

## 1. 先记住最核心的思路

看 Logcat 时，不要直接盯着满屏日志硬看。最有效的做法是按下面顺序筛选：

1. 先只看自己 app 的日志
2. 再只看错误级别日志
3. 再按 Tag 或关键词缩小范围
4. 最后保存成自己常用的过滤条件

你只要先掌握这几个查询方式，已经能解决大部分排错问题。

---

## 2. 最常用的 5 个过滤写法

### 2.1 只看当前项目日志

```text
package:mine
```

作用：只显示当前打开项目相关的日志，先把系统和其他进程的杂音去掉。

---

### 2.2 只看错误日志

```text
package:mine level:ERROR
```

作用：只看当前项目中的错误日志。

说明：
- `level:ERROR` 表示 Error 级别及更严重级别
- 非常适合排查接口失败、空指针、崩溃前异常等问题

---

### 2.3 直接看崩溃日志

```text
package:mine is:crash
```

作用：程序闪退时，直接筛选崩溃日志。

也可以看堆栈：

```text
package:mine is:stacktrace
```

---

### 2.4 按 Tag 查某个模块

如果代码里这样写：

```kotlin
private const val TAG = "LoginActivity"
Log.e(TAG, "login failed")
```

那么在 Logcat 里可以这样查：

```text
tag:LoginActivity
```

或者只看这个 Tag 的错误：

```text
tag:LoginActivity level:ERROR
```

---

### 2.5 只看最近几分钟的日志

```text
package:mine age:5m
```

作用：只显示最近 5 分钟日志。

非常适合场景：
- 你刚点击了一个按钮
- 你刚进入了一个页面
- 你刚复现了一个 bug

这样可以避免被旧日志干扰。

---

## 3. 最推荐你直接收藏的查询模板

### 日常开发

```text
package:mine
```

### 看错误

```text
package:mine level:ERROR
```

### 看闪退

```text
package:mine is:crash
```

### 查某个页面

```text
package:mine tag:MainActivity
```

### 查某个关键词

```text
package:mine message:timeout
```

### 查最近操作引起的问题

```text
package:mine age:3m
```

### 查某页面最近 5 分钟内的错误

```text
package:mine tag:LoginActivity level:ERROR age:5m
```

---

## 4. 常见过滤字段解释

### `package:`
按包名筛选日志。

常用：

```text
package:mine
```

---

### `level:`
按日志级别筛选。

常见级别：
- `VERBOSE`
- `DEBUG`
- `INFO`
- `WARN`
- `ERROR`
- `ASSERT`

例如：

```text
level:ERROR
```

---

### `tag:`
按日志 Tag 筛选。

例如：

```text
tag:Network
```

---

### `message:`
按日志内容中的关键词筛选。

例如：

```text
message:timeout
```

适合查：
- timeout
- failed
- null
- exception

---

### `age:`
按时间范围筛选。

例如：

```text
age:5m
```

常见写法：
- `age:30s` 最近 30 秒
- `age:5m` 最近 5 分钟
- `age:1h` 最近 1 小时

---

### `is:crash`
筛选崩溃日志。

```text
is:crash
```

---

### `is:stacktrace`
筛选异常堆栈信息。

```text
is:stacktrace
```

---

## 5. 多条件组合怎么写

你可以把多个条件组合起来一起查。

例如：

```text
package:mine tag:LoginActivity level:ERROR age:5m
```

含义：
- 当前项目
- LoginActivity 这个模块
- Error 级别
- 最近 5 分钟

这种组合查询是最实用的。

---

## 6. 如何排除无关日志

如果某个 Tag 刷屏，影响你看日志，可以排除它：

```text
package:mine -tag:OpenGLRenderer
```

作用：
- 保留当前项目日志
- 但排除 `OpenGLRenderer` 相关日志

这个方法对处理某些系统日志、渲染日志刷屏特别有用。

---

## 7. 复杂查询写法

如果你想同时看多个模块：

```text
(tag:LoginActivity | tag:AuthRepo) & level:ERROR & package:mine
```

含义：
- 看 `LoginActivity` 或 `AuthRepo`
- 只看 Error
- 只看当前项目

这个在查一整条业务链路时很好用，比如登录流程、支付流程、网络请求流程。

---

## 8. Mac 上看 Logcat 时，几个很有用的按钮

### Pause
暂停日志滚动。

用途：
- 日志滚太快，看不清
- 想停在当前界面慢慢看

---

### Clear
清空当前日志窗口。

用途：
- 先清空
- 再手动复现 bug
- 这样新出现的日志更容易定位

这个按钮非常实用，建议养成习惯。

---

### Soft Wrap
长日志自动换行。

用途：
- 接口返回很长
- 崩溃堆栈一行太长
- 打开后阅读体验更好

---

### New Tab / Split
开新标签页或分屏查看。

用途：
- 一个窗口看全部日志
- 一个窗口只看错误日志
- 对比非常方便

---

## 9. 最推荐的新手排错流程

### 场景 1：点击按钮没反应

建议步骤：

1. 先点 `Clear`
2. 再复现问题
3. 输入：

```text
package:mine age:2m
```

如果日志还是很多，再继续收窄：

```text
package:mine level:ERROR age:2m
```

---

### 场景 2：程序闪退

先输入：

```text
package:mine is:crash
```

重点看这几个关键词：
- `FATAL EXCEPTION`
- `Caused by:`
- 你自己包名下对应的代码行

真正有用的信息，通常不是最上面那一行，而是：
- `Caused by` 后面的异常原因
- 第一个指向你自己代码文件的行号

---

### 场景 3：网络请求失败

建议你自己统一打一个网络 Tag，比如：

```kotlin
private const val TAG = "API"
Log.d(TAG, "request start")
Log.e(TAG, "request fail", e)
```

然后 Logcat 中直接查：

```text
tag:API
```

或者：

```text
tag:API level:ERROR
```

这样一眼就能看到请求开始、成功、失败、异常。

---

## 10. 建议你这样写日志，后面排查会轻松很多

### 10.1 Tag 要固定、要有意义

不推荐：

```kotlin
Log.d("aaa", "clicked")
Log.e("bbb", "fail")
```

推荐：

```kotlin
private const val TAG = "LoginActivity"
Log.d(TAG, "click login")
Log.e(TAG, "login failed: $msg")
```

好处：
- 后面可以直接按 Tag 搜
- 不容易忘记这条日志属于哪个模块
- 团队协作时别人也看得懂

---

### 10.2 错误日志优先用 `Log.e`

例如：

```kotlin
Log.e("Network", "request failed", e)
```

好处：
- 可以直接用 `level:ERROR` 筛出来
- 问题日志和普通调试日志更容易区分

---

### 10.3 打印关键上下文信息

例如：

```kotlin
Log.d("Order", "submit order, userId=$userId, productId=$productId")
```

比起只写一句：

```kotlin
Log.d("Order", "submit")
```

前者更容易定位问题。

因为你后面能立刻知道：
- 是哪个用户
- 提交了哪个商品
- 当时传了哪些参数

---

## 11. 新手最该先记住的 3 条命令

如果你现在只想先记最实用的，记住这 3 个就够了：

```text
package:mine
package:mine level:ERROR
package:mine is:crash
```

解释：
- 第一条：看自己项目日志
- 第二条：看自己项目错误日志
- 第三条：看自己项目崩溃日志

这三条已经足够解决大部分新手调试问题。

---

## 12. 一句话总结

Logcat 不怕日志多，怕的是没有筛选方法。

你只要优先记住下面这些：

- 看自己项目：`package:mine`
- 看错误：`level:ERROR`
- 看闪退：`is:crash`
- 看最近时间：`age:5m`
- 看某个模块：`tag:XXX`

以后排查问题时，不要硬看整屏日志，先缩小范围，再找错误点，效率会高很多。

---

## 13. 适合你抄走保存的速查版

```text
# 看当前项目
package:mine

# 看当前项目错误
package:mine level:ERROR

# 看当前项目崩溃
package:mine is:crash

# 看某个页面
package:mine tag:MainActivity

# 看某个关键词
package:mine message:timeout

# 看最近 5 分钟
package:mine age:5m

# 看某模块最近 5 分钟错误
package:mine tag:LoginActivity level:ERROR age:5m

# 排除某个刷屏 Tag
package:mine -tag:OpenGLRenderer
```

