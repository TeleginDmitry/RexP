import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetFavoritesResponseType } from "./type";

export const getFavoritesThunk = createAsyncThunk("get-favorites", () =>
  $api.get<GetFavoritesResponseType>(`/favorite`).then(({ data }) => (data))
);
