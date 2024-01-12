import $api from "@/src/api/api";

export const increaseCart = async (id: number) => $api.patch(`/user/cart/increase`, { id });
