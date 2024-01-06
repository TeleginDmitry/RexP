import type { BaseThunkAPI } from "@reduxjs/toolkit/src/createAsyncThunk";
import type { AxiosError } from "axios";

import type { AppStore, AppDispatch } from "@/src/store/store";

import type { RejectValueType } from "./type";

export const RejectThunkHandler =
  ({ rejectWithValue }: BaseThunkAPI<AppStore, unknown, AppDispatch, RejectValueType>) =>
  ({ response }: AxiosError<RejectValueType>) =>
    response
      ? rejectWithValue(response.data)
      : rejectWithValue({ data: null, message: "Непредвиденная ошибка", success: false });
