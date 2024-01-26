import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";
import type { Order } from "@/src/types/order.types";

import type { GetOrdersThunk } from "./types";

export const getOrdersThunk = createAsyncThunk<Order[], Partial<GetOrdersThunk>>("get-orders", () =>
  $api.post(`/user/order`).then(({ data }) => data)
);
