import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetOrdersThunk } from "./types";

import type { Order } from "../types";

export const getOrdersThunk = createAsyncThunk<Order[], Partial<GetOrdersThunk>>("get-orders", () =>
  $api.post(`/user/order`).then(({ data }) => data)
);
