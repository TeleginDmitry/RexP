import $api from "@/src/api/api";

export const decreaseCart = async (id: number) => $api.patch(`/user/cart/decrease`, { id });
