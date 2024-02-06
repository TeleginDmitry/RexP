import { createSlice } from '@reduxjs/toolkit'

import { getSizesThunk } from './getSizes/getSizes'
import type { SizesState } from './types'

const initialState: SizesState = {
    success: false,
    data: []
}

const { reducer } = createSlice({
    name: 'sizes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSizesThunk.fulfilled, (store, { payload }) => ({
            ...store,
            data: payload,
            success: true
        }))
        builder.addCase(getSizesThunk.rejected, (store) => ({
            ...store,
            success: false
        }))
    }
})

export default reducer
