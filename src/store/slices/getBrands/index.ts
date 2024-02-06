import { createSlice } from '@reduxjs/toolkit'

import { getBrandsThunk } from './getBrands/getBrands'
import type { BrandsState } from './types'

const initialState: BrandsState = {
    success: false,
    data: []
}

const { reducer } = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBrandsThunk.fulfilled, (store, { payload }) => ({
            ...store,
            data: payload,
            success: true
        }))
        builder.addCase(getBrandsThunk.rejected, (store) => ({
            ...store,
            success: false
        }))
    }
})

export default reducer
