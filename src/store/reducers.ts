import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import delivery from "./slices/delivery";
import filters from "./slices/filters";
import brands from "./slices/getBrands";
import carts from "./slices/getCarts";
import category from "./slices/getCategory";
import colors from "./slices/getColors";
import favorites from "./slices/getFavorite";
import product from "./slices/getOneProduct";
import products from "./slices/getProducts";
import sizes from "./slices/getSizes";

const reducers = {
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
