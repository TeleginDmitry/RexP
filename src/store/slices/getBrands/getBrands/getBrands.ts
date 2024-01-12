import { createAsyncThunk } from "@reduxjs/toolkit";

import $api from "@/src/api/api";

import type { GetBrandsResponseType } from "./type";

export const getBrandsThunk = createAsyncThunk("get-brands", () =>
  $api.get<GetBrandsResponseType>(`/brand`).then(({ data }) => data)
);
