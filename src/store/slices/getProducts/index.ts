import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getProductsThunk } from "./getProducts/getProducts";
import type { ProductsState } from "./types";

const initialState: ProductsState = {
  success: false,
  data: [],
  filters: {
    maxPrice: 359999,
    minPrice: 99,
    colors: [],
    brands: [],
    sizes: [],
  },
};

const { reducer, actions } = createSlice({
  name: "products",
  initialState,
  reducers: {
    addFilters: (store, { payload }: PayloadAction<Partial<ProductsState["filters"]>>) => ({
      ...store,
      filters: {
        ...store.filters,
        ...payload,
      },
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (store, { payload }) => ({
      ...store,
      data: payload,
      success: true,
    }));
    builder.addCase(getProductsThunk.rejected, (store) => ({
      ...store,
      success: false,
    }));
  },
});

export default reducer;

export const { addFilters } = actions;
