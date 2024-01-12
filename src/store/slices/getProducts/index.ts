import { createSlice } from "@reduxjs/toolkit";

import { getProductsThunk } from "./thunks/getProducts/getProducts";
import type { ProductsState } from "./types";

const initialState: ProductsState = {
  success: false,
  page: [],
};

const { reducer } = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
