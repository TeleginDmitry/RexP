import { createSlice } from "@reduxjs/toolkit";

import { getViewedThunk } from "./getViewed/getViewed";
import type { ViewedState } from "./types";

const initialState: ViewedState = {
  success: false,
  data: [],
};

const { reducer } = createSlice({
  name: "viewed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getViewedThunk.fulfilled, (store, { payload }) => ({
      ...store,
      data: payload,
      success: true,
    }));
    builder.addCase(getViewedThunk.rejected, (store) => ({
      ...store,
      success: false,
    }));
  },
});

export default reducer;
