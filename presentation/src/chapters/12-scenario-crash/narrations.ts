import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "如果程序闪退。",
  "先输入 package:mine is:crash。",
  "重点找 FATAL EXCEPTION。",
  "再找 Caused by。",
  "还要找第一个指向你自己代码文件的行号。",
  "真正有用的信息，通常不是最上面那一行。",
  "Caused by 后面的原因，更值得看。",
  "第一个指向你自己代码文件的行号，也更值得看。",
];
