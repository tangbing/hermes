import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "查某个页面，用 package:mine tag:MainActivity。查某个关键词，用 package:mine message:timeout。",
  "查最近操作，用 package:mine age:3m。",
  "如果你要查登录页最近五分钟的错误，就用 package:mine tag:LoginActivity level:ERROR age:5m。",
  "这些模板不是背下来就完事。关键是知道每个字段在干什么。",
];
