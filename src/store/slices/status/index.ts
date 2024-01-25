import { createSlice } from "@reduxjs/toolkit";

import { getStatusThunk } from "./getStatus/getStatus";
import type { StatusState } from "./types";

const initialState: StatusState = {
  success: false,
  data: [],
};

const { reducer } = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatusThunk.fulfilled, (store, { payload }) => ({
      ...store,
      data: payload,
      success: true,
    }));
    builder.addCase(getStatusThunk.rejected, (store) => ({
      ...store,
      success: false,
    }));
  },
});

export default reducer;
