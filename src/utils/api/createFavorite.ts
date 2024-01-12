import $api from "@/src/api/api";

export type CreateFavoriteType = {
  productId: number;
};

export const createFavorite = async (payload: CreateFavoriteType) =>
  $api
    .post("/favorite", payload)
    .then(({ data: { success } }) => ({ success }))
    .catch(({ response: { data } }) => ({ ...data.errors }));
