import $api from "@/src/api/api";
import type { Delivery } from "@/src/types/delivery.types";

export type DeliveryCartType = {
  firstName: string;
  lastName: string;
  patronymic: string;
  number: string;
  city: string;
  address: string;
  isMain: boolean;
  deliveryTypeId: number;
};

export const createDeliveryCart = async (payload: Delivery) => $api.post("/user/delivery/create", payload);

export const editDeliveryCart = async (id: number, payload: Partial<Delivery>) =>
  $api.patch(`/user/delivery/${id}`, payload);

export const deleteDeliveryCart = async (id: number | string) => $api.delete(`/user/delivery/${id}`);
