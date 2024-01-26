/* eslint-disable no-restricted-syntax */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getDeliveryThunk } from "./getDelivery/getDelivery";
import type { DeliveryState } from "./types";

const initialState: DeliveryState = {
  success: false,
  data: [],
};

const { reducer, actions } = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    changeIsMain(state, action: PayloadAction<{ value: boolean; id: number }>) {
      state.data.forEach((item) => {
        item.isMain = false;
      });

      const delivery = state.data.find(({ id }) => id === action.payload.id);

      if (delivery) {
        delivery.isMain = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDeliveryThunk.fulfilled, (store, { payload }) => ({
      ...store,
      data: payload,
      success: true,
    }));
    builder.addCase(getDeliveryThunk.rejected, (store) => ({
      ...store,
      success: false,
    }));
  },
});

export default reducer;

export const { changeIsMain } = actions;
