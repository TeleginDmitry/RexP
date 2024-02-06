import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'
import type { Order } from '@/src/types/order.types'

import type { GetOrderThunk } from './types'

export const getOrderThunk = createAsyncThunk<Order, Partial<GetOrderThunk>>(
    'get-order',
    ({ id }) => $api.get(`user/order/one/${id}`).then(({ data }) => data)
)
