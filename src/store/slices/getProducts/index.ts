import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import {
    getPaginatedProductsThunk,
    getProductsThunk
} from './getProducts/getProducts'
import type { Product, ProductsState } from './types'

const initialState: ProductsState = {
    success: false,
    data: [],
    isLoading: false
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
        },
        resetProducts: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsThunk.fulfilled, (store, { payload }) => ({
            ...store,
            data: payload.results,
            success: true,
            isLoading: false
        }))

        builder.addCase(getProductsThunk.rejected, (store) => ({
            ...store,
            success: false,
            isLoading: false
        }))
        builder.addCase(getProductsThunk.pending, (store) => ({
            ...store,
            isLoading: true
        }))
        builder.addCase(
            getPaginatedProductsThunk.fulfilled,
            (store, { payload }) => ({
                ...store,
                data: store.data.concat(payload.results),
                success: true,
                isLoading: false
            })
        )
        builder.addCase(getPaginatedProductsThunk.rejected, (store) => ({
            ...store,
            success: false,
            isLoading: false
        }))
        builder.addCase(getPaginatedProductsThunk.pending, (store) => ({
            ...store,
            isLoading: true
        }))
    }
})

export default reducer

export const { addPaginatedProducts, resetProducts } = actions
