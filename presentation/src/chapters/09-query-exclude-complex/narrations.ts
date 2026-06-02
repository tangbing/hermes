import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "如果某个 Tag 一直刷屏，也可以排除它。",
  "比如 package:mine -tag:OpenGLRenderer。",
  "它保留当前项目日志，但把 OpenGLRenderer 相关日志去掉。",
  "系统日志、渲染日志刷屏时，这招很有用。",
  "再复杂一点，你可以同时看多个模块。比如 (tag:LoginActivity | tag:AuthRepo) & level:ERROR & package:mine。它就是看 LoginActivity 或 AuthRepo，同时只看 Error，而且只看当前项目。",
  "登录、支付、网络请求这种链路，适合这样查。",
];
