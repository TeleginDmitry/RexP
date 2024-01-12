import { createSlice } from "@reduxjs/toolkit";

import { getDeliveryThunk } from "./getDelivery/getDelivery";
import type { DeliveryState } from "./types";

const initialState: DeliveryState = {
  success: false,
  data: [],
};

const { reducer } = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
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
