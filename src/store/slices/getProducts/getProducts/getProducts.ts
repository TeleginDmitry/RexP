import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'

import type { GetProductsResponseType } from './type'

import type { PayloadFilter } from '../types'

export const getProductsThunk = createAsyncThunk<
    GetProductsResponseType,
    PayloadFilter
>('get-products', ({ filters }) =>
    $api
        .post<GetProductsResponseType>(`/product/all`, filters)
        .then(({ data }) => data)
)

export const getPaginatedProductsThunk = createAsyncThunk<
    GetProductsResponseType,
    PayloadFilter
>('get-paginated-products', ({ filters }) =>
    $api
        .post<GetProductsResponseType>(`/product/all`, filters)
        .then(({ data }) => data)
)
