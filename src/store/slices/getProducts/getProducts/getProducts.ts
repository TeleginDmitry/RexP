import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetProductsResponseType } from "./type";

import type { PayloadFilter } from "../types";

export const getProductsThunk = createAsyncThunk("get-products", (filters: PayloadFilter) =>
  $api.post<GetProductsResponseType>(`/product/all`, filters.filters).then(({ data }) => data)
);
