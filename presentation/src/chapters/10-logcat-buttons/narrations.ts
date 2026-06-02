import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "Mac 上看 Logcat，还有几个按钮要会用。",
  "Pause 是暂停日志滚动。日志刷太快，看不清时，先按它。",
  "你也可以停在当前界面慢慢看。",
  "Clear 是清空当前窗口。",
  "正确姿势是先 Clear，再复现 bug。这样新出现的日志就很干净。",
  "Soft Wrap 是长日志自动换行。接口返回很长，或者堆栈一行太长时，打开它会舒服很多。",
  "New Tab 和 Split 是开新标签或分屏。",
  "一个窗口看全部日志，另一个窗口只看错误日志。对比起来会方便很多。",
];
