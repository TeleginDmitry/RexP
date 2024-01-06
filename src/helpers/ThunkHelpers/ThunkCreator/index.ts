import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AsyncThunk, BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

import type { AppStore, AppDispatch } from "@/src/store/store";

import { RejectThunkHandler } from "../RejectThunkHandler";
import type { RejectValueType } from "../RejectThunkHandler/type";

export type ThunkAPIType = BaseThunkAPI<AppStore, unknown, AppDispatch, RejectValueType>;

export const ThunkCreatorWrapper = <R, T>(prefix: string, APICall: (arg: T) => Promise<R>) =>
  ((): AsyncThunk<R, T, ThunkAPIType> =>
    createAsyncThunk<R, T, ThunkAPIType>(prefix, async (arg, api) =>
      // @ts-expect-error
      APICall(arg).catch(RejectThunkHandler(api))
    ))();
