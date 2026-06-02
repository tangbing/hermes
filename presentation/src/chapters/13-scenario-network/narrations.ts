import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "如果是网络请求失败。",
  "建议你自己统一一个网络 Tag。比如 TAG = \"API\"。",
  "请求开始打 request start。",
  "请求失败打 request fail，并把异常传进去。",
  "然后 Logcat 里直接查 tag:API。",
  "只看错误，就查 tag:API level:ERROR。",
  "这样请求开始、成功、失败、异常。",
  "会在一条线上。",
];
