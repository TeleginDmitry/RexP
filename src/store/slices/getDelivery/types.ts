import type { Delivery } from "@/src/types/delivery.types";

export type DeliveryState = Readonly<{
  success: boolean;
  data: Delivery[];
}>;
