import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { DeliveryState } from "./types";

const initialState: DeliveryState = {
  address: {
    city: "",
    street: "",
    house: "",
    flat: "",
  },
  recipient: {
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
  },
};

const { actions, reducer } = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryData: (state, { payload }: PayloadAction<DeliveryState>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { setDeliveryData } = actions;

export default reducer;
