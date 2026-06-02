import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "这里留一个速查版。",
  "看当前项目：package:mine。看当前项目错误：package:mine level:ERROR。看当前项目崩溃：package:mine is:crash。",
  "看某个页面：package:mine tag:MainActivity。看某个关键词：package:mine message:timeout。看最近五分钟：package:mine age:5m。",
  "看某模块最近五分钟错误：package:mine tag:LoginActivity level:ERROR age:5m。",
  "排除刷屏 Tag：package:mine -tag:OpenGLRenderer。",
  "Logcat 不怕日志多。",
  "怕的是你没有筛选方法。",
  "以后别硬看整屏日志。先缩小范围，再找错误点。",
];
