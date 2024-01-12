import { createSlice } from "@reduxjs/toolkit";

import { getCategoriesThunk } from "./getCategory/getCategory";
import type { CategoryState } from "./types";

const initialState: CategoryState = {
  success: false,
  data: [],
};

const { reducer } = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (store, { payload }) => ({
      ...store,
      data: payload,
      success: true,
    }));
    builder.addCase(getCategoriesThunk.rejected, (store) => ({
      ...store,
      success: false,
    }));
  },
});

export default reducer;
