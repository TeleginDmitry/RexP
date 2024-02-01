import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'
import type { City } from '@/src/types/city'

export const getCityThunk = createAsyncThunk('get-city', (name: string = '') =>
    $api
        .get<City[]>(`/location/city`, { params: { name } })
        .then(({ data }) => data)
)
