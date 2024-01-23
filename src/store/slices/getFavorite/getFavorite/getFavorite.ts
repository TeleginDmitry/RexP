import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";
import type { FilterFavoritesType } from "@/src/types/Filter/filter.types";

import type { GetFavoritesResponseType } from "./type";

export const getFavoritesThunk = createAsyncThunk<GetFavoritesResponseType, Partial<FilterFavoritesType>>(
  "get-favorites",
  (filters) => $api.post<GetFavoritesResponseType>(`/favorite`, filters).then(({ data }) => data)
);
