import { createSlice } from '@reduxjs/toolkit'

import { getColorsThunk } from './getColors/getColors'
import type { ColorsState } from './types'

const initialState: ColorsState = {
    success: false,
    data: []
}

const { reducer } = createSlice({
    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getColorsThunk.fulfilled, (store, { payload }) => ({
            ...store,
            data: payload,
            success: true
        }))
        builder.addCase(getColorsThunk.rejected, (store) => ({
            ...store,
            success: false
        }))
    }
})

export default reducer
