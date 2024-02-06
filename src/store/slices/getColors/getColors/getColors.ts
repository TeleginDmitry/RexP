import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'

import type { GetColorsResponseType } from './type'

export const getColorsThunk = createAsyncThunk('get-colors', () =>
    $api.get<GetColorsResponseType>(`/color`).then(({ data }) => data)
)
