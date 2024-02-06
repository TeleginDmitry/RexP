import { createAsyncThunk } from '@reduxjs/toolkit'

import $api from '@/src/api/api'

import type { GetStatusResponseType } from './type'

export const getStatusThunk = createAsyncThunk('get-status', () =>
    $api.get<GetStatusResponseType>(`/order/status`).then(({ data }) => data)
)
