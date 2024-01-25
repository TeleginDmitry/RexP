import { createSlice } from "@reduxjs/toolkit";

import { getOrdersThunk } from "./thunks";
import type { OrdersState } from "./types";

const initialState: OrdersState = {
  success: false,
  data: [],
};

const { reducer } = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.fulfilled, (store, { payload }) => ({
      ...store,
      data: payload,
      success: true,
    }));
    builder.addCase(getOrdersThunk.rejected, (store) => ({
      ...store,
      success: false,
    }));
  },
});

export default reducer;
