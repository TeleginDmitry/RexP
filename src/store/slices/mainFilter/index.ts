import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { MainFiltersState } from "./types";

const initialState: MainFiltersState = {
  isOpen: false,
  filters: {
    maxPrice: 359999,
    minPrice: 99,
    colors: [],
    brands: [],
    sizes: [],
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
      },
    }),
    setColors: (state, { payload: { colors } }: PayloadAction<{ colors: string[] }>) => ({
      ...state,
      filters: {
        ...state.filters,
        colors,
      },
    }),
    setBrands: (state, { payload: { brands } }: PayloadAction<{ brands: string[] }>) => ({
      ...state,
      filters: {
        ...state.filters,
        brands,
      },
    }),
    setSizes: (state, { payload: { sizes } }: PayloadAction<{ sizes: string[] }>) => ({
      ...state,
      filters: {
        ...state.filters,
        sizes,
      },
    }),
  },
});

export const {
  setMainFilterOpenState,
  switchMainFilterOpenState,
  setMaxPrice,
  setMinPrice,
  setBrands,
  setColors,
  setSizes,
} = actions;

export default reducer;
