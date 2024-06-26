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
        updatedAt: '',
        isOuter: false
    },
    isLoading: true
}

const { reducer } = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOneProductThunk.fulfilled, (store, { payload }) => ({
            ...store,
            data: payload,
            success: true,
            isLoading: false
        }))
        builder.addCase(getOneProductThunk.pending, (store, { payload }) => ({
            ...store,
            isLoading: true
        }))
        builder.addCase(getOneProductThunk.rejected, (store) => ({
            ...store,
            success: false,
            isLoading: false
        }))
    }
})

export default reducer
