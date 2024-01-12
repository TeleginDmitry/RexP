import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getCartsThunk } from "./getCarts/getCarts";
import type { CartsState } from "./types";

const initialState: CartsState = {
  success: false,
  data: [],
};

const { reducer, actions } = createSlice({
  name: "carts",
  initialState,
  reducers: {
    deleteCartFromStore: (state, { payload: { id } }: PayloadAction<{ id: number }>) => ({
      ...state,
      data: state.data.filter((item) => item.id !== id),
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getCartsThunk.fulfilled, (store, { payload }) => ({
      ...store,
      data: payload,
      success: true,
    }));
    builder.addCase(getCartsThunk.rejected, (store) => ({
      ...store,
      success: false,
    }));
  },
});

export const { deleteCartFromStore } = actions;

export default reducer;
