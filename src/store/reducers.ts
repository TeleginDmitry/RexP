/* eslint-disable import/no-duplicates */
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import filter from "./slices/filter";
import filters from "./slices/filters";
import brands from "./slices/getBrands";
import carts from "./slices/getCarts";
import category from "./slices/getCategory";
import colors from "./slices/getColors";
import delivery from "./slices/getDelivery";
import deliveryCarts from "./slices/getDelivery";
import favorites from "./slices/getFavorite";
import product from "./slices/getOneProduct";
import products from "./slices/getProducts";
import sizes from "./slices/getSizes";
import viewed from "./slices/getViewed";
import orders from "./slices/orders";
import status from "./slices/status";

const reducers = {
  status,
  filters,
  delivery,
  products,
  favorites,
  sizes,
  colors,
  brands,
  category,
  product,
  carts,
  viewed,
  deliveryCarts,
  filter,
  orders,
};

const combinedReducer = combineReducers({
  ...reducers,
});

export type StoreType = ReturnType<typeof combinedReducer>;

export const reducer = (state: StoreType | undefined, action: any): StoreType => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combinedReducer(state, action);
};
