import $api from "@/src/api/api";

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

export const createDeliveryCart = async (payload: DeliveryCartType) => $api.post("/user/delivery/create", payload);

export const editDeliveryCart = async (payload: DeliveryCartType) => $api.patch("/user/delivery/edit", payload);

export const deleteDeliveryCart = async (id: number | string) => $api.delete(`/user/delivery/${id}`);
