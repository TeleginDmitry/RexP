import { createSlice } from '@reduxjs/toolkit'

import { getCityThunk } from './thunks/getDelivery'
import type { CityState } from './types'

const initialState: CityState = []

const { reducer } = createSlice({
    name: 'city',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCityThunk.fulfilled, (store, { payload }) => payload)
    }
})

export default reducer
