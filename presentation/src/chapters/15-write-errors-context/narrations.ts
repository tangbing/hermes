import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "错误日志优先用 Log.e。",
  "比如 Log.e(\"Network\", \"request failed\", e)。",
  "这样你用 level:ERROR 一筛，问题日志就出来了。",
  "普通调试日志和真正错误，也更容易分开。",
  "还要记得打关键上下文。比如提交订单时，不要只写 submit。",
  "写成 submit order, userId=$userId, productId=$productId。",
  "这样你回头一看，就知道是哪个用户。",
  "也知道提交了哪个商品。当时传了哪些参数，也能看见。",
];
