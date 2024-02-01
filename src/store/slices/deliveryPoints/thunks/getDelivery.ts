import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'
import type { DeliveryPoints } from '@/src/types/deliveryPoints'

export const getDeliveryPointsThunk = createAsyncThunk(
    'get-deliveryPoints',
    (cityCode: number) =>
        $api
            .get<DeliveryPoints[]>(`/location/deliveryPoints`, {
                params: { cityCode }
            })
            .then(({ data }) => data)
)
