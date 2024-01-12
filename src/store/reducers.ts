import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import delivery from "./slices/delivery";
import filters from "./slices/filters";
import products from "./slices/getProducts";

const reducers = {
  filters,
  delivery,
  products,
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
