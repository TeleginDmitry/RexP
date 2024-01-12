import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetProductsResponseType } from "./type";

import type { Filters } from "../../types";

export const getProductsThunk = createAsyncThunk("get-products", (filters: Filters) =>
  $api.post<GetProductsResponseType>(`/product/all`, filters).then(({ data }) => ({ ...data }))
);
