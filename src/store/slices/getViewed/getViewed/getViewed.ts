import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetViewedResponseType } from "./type";

export const getViewedThunk = createAsyncThunk("get-viewed", () =>
  $api.get<GetViewedResponseType>(`/product/viewed`).then(({ data }) => data)
);
