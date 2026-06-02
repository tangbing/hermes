import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "message 是按日志内容里的关键词筛。比如 message:timeout。",
  "也可以查 failed、null、exception。这些词很适合找接口失败和异常。",
  "age 是按时间筛。age:30s 是最近三十秒，age:5m 是最近五分钟，age:1h 是最近一小时。",
  "is:crash 专门看崩溃。",
  "is:stacktrace 专门看异常堆栈。",
];
