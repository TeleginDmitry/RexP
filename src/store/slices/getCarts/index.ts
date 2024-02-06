import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { getCartsThunk } from './getCarts/getCarts'
import type { CartsState } from './types'

const initialState: CartsState = {
    success: false,
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
        increaseCarts: (state) => ({
            ...state,
            data: [...state.data, state.data[0]]
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
        builder.addCase(getCartsThunk.fulfilled, (store, { payload }) => ({
            ...store,
            data: payload,
            success: true
        }))
        builder.addCase(getCartsThunk.rejected, (store) => ({
            ...store,
            success: false
        }))
    }
})

export const {
    deleteCartFromStore,
    increaseCarts,
    increaseCartProductCount,
    decreaseCartProductCount
} = actions

export default reducer
