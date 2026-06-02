import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "package 是按包名筛。",
  "最常见就是 package:mine。",
  "level 是按日志级别筛。常见级别有 VERBOSE、DEBUG、INFO、WARN、ERROR、ASSERT。",
  "你查 level:ERROR，就是只看错误和更严重的问题。",
  "tag 是按日志 Tag 筛。比如 tag:Network，就只盯网络模块。",
];
