import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetCartsResponseType } from "./type";

export const getCartsThunk = createAsyncThunk("get-carts", () =>
  $api.get<GetCartsResponseType>(`/user/cart`).then(({ data }) => data)
);
