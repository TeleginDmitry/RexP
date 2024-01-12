import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetCategoriesResponseType } from "./type";

export const getCategoriesThunk = createAsyncThunk("get-categories", () =>
  $api.get<GetCategoriesResponseType>(`/category`).then(({ data }) => data)
);
