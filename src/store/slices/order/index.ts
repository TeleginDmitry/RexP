import { createSlice } from '@reduxjs/toolkit'

import { getOrderThunk } from './thunks'
import type { OrdersState } from './types'

const initialState: OrdersState = {
    id: 0,
    totalPrice: 0,
    trackNumber: '',
    isReviwed: false,
    orderStatus: {
        id: 0,
        name: ''
    },
    delivery: {
        firstName: '',
        lastName: '',
        patronymic: '',
        number: '',
        city: '',
        address: '',
        isMain: false,
        deliveryType: {
            id: 0,
            name: ''
        },

        house: null,
        flat: null,
        street: '',
        id: 0,
        userId: 0,
        createdAt: '',
        updatedAt: '',
        pvzAddress: '',
        deliveryPointAddress: ''
    },
    orderContents: [],
    createdAt: '',
    updatedAt: '',
    shippingDate: ''
}

const { reducer } = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getOrderThunk.fulfilled,
            (store, { payload }) => payload
        )
    }
})

export default reducer
