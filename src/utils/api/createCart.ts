import $api from "@/src/api/api";

export type CreateCartType = {
  productId: number;
  sizeId: number;
};

export const createCart = async (payload: CreateCartType) => $api.post("/user/cart", payload);
