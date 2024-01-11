import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { DeliveryState } from "./types";

const initialState: DeliveryState = {
  city: "",
  street: "",
  house: "",
  flat: "",
  surname: "",
  name: "",
  patronymic: "",
  phone: "",
};

const { actions, reducer } = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryData: (
      state,
      { payload: { value, name } }: PayloadAction<{ value: string; name: keyof DeliveryState }>
    ) => ({
      ...state,
      ...{ [name]: value },
    }),
  },
});

export const { setDeliveryData } = actions;

export default reducer;
