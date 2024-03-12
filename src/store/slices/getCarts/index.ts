import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { getCartsThunk } from './getCarts/getCarts'
import type { CartsState } from './types'

const initialState: CartsState = {
    success: false,
    isLoading: false,
    initLength: null,
    data: []
}

const { reducer, actions } = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        deleteCartFromStore: (
            state,
            { payload: { id } }: PayloadAction<{ id: number }>
        ) => ({
            ...state,
            data: state.data.filter((item) => item.id !== id)
        }),

        increaseCartProductCount: (
            state,
            { payload: { id } }: PayloadAction<{ id: number }>
        ) => ({
            ...state,
            data: state.data.map((item) =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        }),
        decreaseCartProductCount: (
            state,
            { payload: { id } }: PayloadAction<{ id: number }>
        ) => ({
            ...state,
            data: state.data.map((item) =>
                item.id === id ? { ...item, count: item.count - 1 } : item
            )
        })
    },
    extraReducers: (builder) => {
        builder.addCase(getCartsThunk.fulfilled, (store, { payload }) => {
            const result: CartsState = {
                ...store,
                data: payload,
                isLoading: false,
                success: true
            }

            if (store.initLength === null) {
                result.initLength = payload.length
            }

            return result
        })
        builder.addCase(getCartsThunk.rejected, (store) => ({
            ...store,
            success: false,
            isLoading: false
        }))
        builder.addCase(getCartsThunk.pending, (store) => ({
            ...store,
            isLoading: true
        }))
    }
})

export const {
    deleteCartFromStore,
    increaseCartProductCount,
    decreaseCartProductCount
} = actions

export default reducer
