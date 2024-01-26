import type { Order } from "@/src/types/order.types";

export type OrdersState = Readonly<{
  success: boolean;
  data: Order[];
}>;
