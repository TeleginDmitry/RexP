import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'

import type { GetSizesResponseType } from './type'

export const getSizesThunk = createAsyncThunk(
    'get-sizes',
    (categoryId?: number) =>
        $api
            .get<GetSizesResponseType>(`/size`, { params: { categoryId } })
            .then(({ data }) => data)
)
