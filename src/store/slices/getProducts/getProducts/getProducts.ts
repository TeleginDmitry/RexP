import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";
import type { StoreType } from "@/src/store/reducers";

import type { GetProductsResponseType } from "./type";

import type { PayloadFilter } from "../types";

export const getProductsThunk = createAsyncThunk<GetProductsResponseType, PayloadFilter, { state: StoreType }>(
  "get-products",
  ({ filters: extraFilters }, { getState }) => {
    const {
      products: { filters },
    } = getState();

    return $api.post<GetProductsResponseType>(`/product/all`, { ...filters, ...extraFilters }).then(({ data }) => data);
  }
);
