import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "程序闪退时，直接查 package:mine is:crash。想看堆栈，就查 package:mine is:stacktrace。",
  "如果代码里有 TAG = LoginActivity，Logcat 里就可以搜 tag:LoginActivity。",
  "只看这个页面的错误，就搜 tag:LoginActivity level:ERROR。Tag 固定以后，定位模块会快很多。",
  "你刚点了按钮，刚进入页面，或者刚复现 bug，就查 package:mine age:5m。旧日志不会再干扰你。",
];
