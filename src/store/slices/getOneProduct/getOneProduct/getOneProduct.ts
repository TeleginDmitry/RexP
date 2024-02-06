import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'

import type { GetOneProductsResponseType } from './type'

export const getOneProductThunk = createAsyncThunk(
    'get-one-product',
    (id: string) =>
        $api
            .get<GetOneProductsResponseType>(`/product/one/${id}`)
            .then(({ data }) => data)
)
