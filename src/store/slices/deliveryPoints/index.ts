import { createSlice } from '@reduxjs/toolkit'

import { getDeliveryPointsThunk } from './thunks/getDelivery'
import type { DeliveryPointsState } from './types'

const initialState: DeliveryPointsState = []

const { reducer } = createSlice({
    name: 'deliveryPoints',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getDeliveryPointsThunk.fulfilled,
            (store, { payload }) => payload
        )
    }
})

export default reducer
