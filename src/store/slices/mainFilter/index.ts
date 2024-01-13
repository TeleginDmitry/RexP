import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { MainFiltersState } from "./types";

const initialState: MainFiltersState = {
  isOpen: false,
  filters: {
    maxPrice: 99,
    minPrice: 359999,
    colors: [],
  },
};

const { actions, reducer } = createSlice({
  name: "mainFilter",
  initialState,
  reducers: {
    setMainFilterOpenState: (state, { payload: { isOpen } }: PayloadAction<{ isOpen: boolean }>) => ({
      ...state,
      isOpen,
    }),
    switchMainFilterOpenState: (state) => ({
      ...state,
      isOpen: !state.isOpen,
    }),
    setMaxPrice: (state, { payload: { maxPrice } }: PayloadAction<{ maxPrice: number }>) => ({
      ...state,
      filters: {
        ...state.filters,
        maxPrice,
      },
    }),
    setMinPrice: (state, { payload: { minPrice } }: PayloadAction<{ minPrice: number }>) => ({
      ...state,
      filters: {
        ...state.filters,
        minPrice,
      }
    })
  },
});

export const { setMainFilterOpenState, switchMainFilterOpenState, setMaxPrice, setMinPrice } = actions;

export default reducer;
