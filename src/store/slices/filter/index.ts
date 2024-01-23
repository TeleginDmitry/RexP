/* eslint-disable no-restricted-syntax */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { FilterState } from "./types";

const initialState: FilterState = {
  indexPage: { brands: [], colors: [], sizes: [], maxPrice: 3599999, minPrice: 99 },
  basketPage: { brands: [], maxPrice: 3599999, minPrice: 99 },
  favoritesPage: { brands: [], maxPrice: 3599999, minPrice: 99 },
};

const { reducer, actions } = createSlice({
  name: "mainFilter",
  initialState,
  reducers: {
    addFiltersToIndexPage(state, { payload }: PayloadAction<Partial<FilterState["indexPage"]>>) {
      state.indexPage = {
        ...state.indexPage,
        ...payload,
      };
    },
    deleteCategoryIdFromIndexPage(state) {
      const { categoryId, ...data } = state.indexPage;

      state.indexPage = data;
    },
  },
});

export default reducer;

export const { addFiltersToIndexPage, deleteCategoryIdFromIndexPage } = actions;
