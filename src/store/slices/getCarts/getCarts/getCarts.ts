import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";
import type { FilterCartsType } from "@/src/types/Filter/filter.types";

import type { GetCartsResponseType } from "./type";

export const getCartsThunk = createAsyncThunk<GetCartsResponseType, Partial<FilterCartsType>>("get-carts", (filters) =>
  $api.post<GetCartsResponseType>(`/user/cart`, filters).then(({ data }) => data)
);
