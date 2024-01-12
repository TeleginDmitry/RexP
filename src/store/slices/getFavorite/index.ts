import { createSlice } from "@reduxjs/toolkit";

import { getFavoritesThunk } from "./getFavorite/getFavorite";
import type { FavoritesState } from "./types";

const initialState: FavoritesState = {
  success: false,
  data: [],
};

const { reducer } = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoritesThunk.fulfilled, (store, { payload }) => ({
      ...store,
      data: payload,
      success: true,
    }));
    builder.addCase(getFavoritesThunk.rejected, (store) => ({
      ...store,
      success: false,
    }));
  },
});

export default reducer;
