import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'
import type { Delivery } from '@/src/types/delivery.types'

export const getDeliveryThunk = createAsyncThunk(
    'get-delivery-one',
    (id: number) =>
        $api.get<Delivery>(`/user/delivery/one/${id}`).then(({ data }) => data)
)
