import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'

import type { GetSizesResponseType } from './type'

export const getSizesThunk = createAsyncThunk('get-sizes', () =>
    $api.get<GetSizesResponseType>(`/size`).then(({ data }) => data)
)
