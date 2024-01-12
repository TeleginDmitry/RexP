import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetDeliveryResponseType } from "./type";

export const getDeliveryThunk = createAsyncThunk("get-delivery", () =>
  $api.get<GetDeliveryResponseType>(`/user/delivery`).then(({ data }) => data)
);
