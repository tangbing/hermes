# Android Studio Logcat 使用指南 · 网页视频演示

这是一个把《Android Studio Logcat 使用指南》做成可录屏网页视频的项目。

项目包含：

- 原文、口播稿和开发计划
- 17 章 16:9 网页演示
- 每个 step 对应的 TTS 音频
- 自动播放模式，可直接用于整体预览或录屏

## 快速预览

进入演示项目：

```bash
cd presentation
npm install
npm run dev -- --host 127.0.0.1 --port 5174
```

从头自动播放整片：

```text
http://127.0.0.1:5174/?auto=1&start=1
```

打开后按一次 `Space` 启动。之后页面会自动播放当前 step 的音频，音频结束后自动进入下一步。

只播放音频、手动点击翻页：

```text
http://127.0.0.1:5174/?audio=1
```

普通手动预览：

```text
http://127.0.0.1:5174/
```

## 操作方式

- 点击画面空白处：下一步
- `ArrowRight` / `Space`：下一步
- `ArrowLeft` / `Backspace`：上一步
- `Home`：回到第一章第一步
- `End`：跳到最后一步
- `M`：切换播放模式，顺序为 `manual -> audio -> auto -> manual`

播放模式：

- `manual`：不播放音频，手动翻页
- `audio`：进入 step 时播放音频，但仍由用户手动翻页
- `auto`：播放音频并在音频结束后自动翻页

## 目录结构

```text
.
├── Android Studio Logcat 使用指南.md  # 原始材料
├── article.md                         # 开发阶段使用的文章源
├── script.md                          # 口播稿
├── outline.md                         # 章节计划
├── stack.jpg                          # 素材
├── presentation/                      # Vite + React 演示项目
└── .agents/skills/                    # 本项目沉淀的 Codex skills
```

`presentation/` 关键目录：

```text
presentation/
├── audio-segments.json                # 从 narrations.ts 抽取的音频清单
├── public/audio/<chapter-id>/<N>.mp3  # 已合成音频，N 从 1 开始
├── scripts/extract-narrations.ts      # 抽取口播文本
├── scripts/synthesize-audio.sh        # TTS 合成 runner
├── scripts/tts-providers/say.sh       # 本地 macOS say provider
└── src/chapters/<NN>-<id>/            # 每章画面和 narrations
```

## 章节

当前共有 17 章：

1. 别硬盯满屏日志
2. 当前项目和错误日志
3. 崩溃、模块和时间
4. 先收藏三条核心模板
5. 页面、关键词和最近操作
6. `package`、`level`、`tag`
7. `message`、`age` 和 `is`
8. 组合查询最实用
9. 排除刷屏和查业务链路
10. Mac 上几个有用按钮
11. 点按钮没反应怎么查
12. 程序闪退看哪里
13. 网络请求失败怎么查
14. 日志 Tag 要固定、有意义
15. 错误级别和上下文
16. 新手先记三条命令
17. 速查版和收束

## 音频

音频已经生成：

- 17 个章节目录
- 106 个 mp3 文件
- 输出位置：`presentation/public/audio/`
- 文件格式：`public/audio/<chapter-id>/<step>.mp3`

本项目使用本地 macOS `say` provider 合成，音色为：

```text
Reed (中文（中国大陆）)
```

重新抽取口播清单：

```bash
cd presentation
npm run extract-narrations
```

重新合成缺失音频：

```bash
cd presentation
npm run synthesize-audio -- --provider=say --voice="Reed (中文（中国大陆）)"
```

默认会跳过已存在的 mp3。不要随便加 `--force`，除非需要重新生成所有音频。

## 构建

检查生产构建：

```bash
cd presentation
npm run build
```

构建产物输出到：

```text
presentation/dist/
```

## 录屏建议

1. 启动 dev server。
2. 打开 `http://127.0.0.1:5174/?auto=1&start=1`。
3. 开始屏幕录制。
4. 按一次 `Space`。
5. 等页面自动播放完整片。
6. 停止录制。

如果中途要重新从头预览，继续使用 `?auto=1&start=1`。`start=1` 会忽略浏览器保存的上次播放位置。

## Skills

本项目包含两个项目级 Codex skill：

- `.agents/skills/web-video-presentation`：把文章或口播稿开发成网页视频演示。
- `.agents/skills/create-tts`：抽取口播清单，经人工确认后合成每 step 音频。

音频流程必须先抽取并人工确认 `audio-segments.json`，确认后再合成。
