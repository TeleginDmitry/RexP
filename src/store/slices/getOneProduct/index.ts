import { createSlice } from '@reduxjs/toolkit'

import { getOneProductThunk } from './getOneProduct/getOneProduct'
import type { OneProductsState } from './types'

const initialState: OneProductsState = {
    success: false,
    data: {
        id: 0,
        name: '',
        discount: 0,
        gender: '',
        productSizes: [],
        price: 0,
        subcategories: { id: 0, name: '' },
        brand: {
            id: 0,
            name: ''
        },
        color: {
            id: 0,
            name: '',
            colorID: ''
        },
        images: [],
        createdAt: '',
        updatedAt: ''
    }
}

const { reducer } = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOneProductThunk.fulfilled, (store, { payload }) => ({
            ...store,
            data: payload,
            success: true
        }))
        builder.addCase(getOneProductThunk.rejected, (store) => ({
            ...store,
            success: false
        }))
    }
})

export default reducer
