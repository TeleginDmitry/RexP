import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import {
    getPaginatedProductsThunk,
    getProductsThunk
} from './getProducts/getProducts'
import type { Product, ProductsState } from './types'

const initialState: ProductsState = {
    success: false,
    data: []
}

const { reducer, actions } = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addPaginatedProducts: (
            state,
            { payload }: PayloadAction<Product[]>
        ) => {
            state.data = state.data.concat(payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsThunk.fulfilled, (store, { payload }) => ({
            ...store,
            data: payload.results,
            success: true
        }))
        builder.addCase(getProductsThunk.rejected, (store) => ({
            ...store,
            success: false
        }))
        builder.addCase(
            getPaginatedProductsThunk.fulfilled,
            (store, { payload }) => ({
                ...store,
                data: store.data.concat(payload.results),
                success: true
            })
        )
    }
})

export default reducer

export const { addPaginatedProducts } = actions
