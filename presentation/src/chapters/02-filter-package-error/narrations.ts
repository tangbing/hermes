import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "最常用的一条，是 package:mine。",
  "它只看当前打开项目相关的日志。系统日志和其他进程的杂音，先扔到一边。",
  "如果要看错误，就加 level:ERROR。",
  "完整写法是 package:mine level:ERROR。",
  "接口失败、空指针、崩溃前异常，都适合从这里看。",
];
