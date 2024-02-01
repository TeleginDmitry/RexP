import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { getDeliveryThunk } from './thunks/getDelivery'
import type { DeliveryState } from './types'

const initialState: DeliveryState = {
    city: '',
    house: '',
    flat: '',
    patronymic: '',
    id: 0,
    firstName: '',
    lastName: '',
    number: '',
    address: '',
    isMain: false,
    deliveryType: {
        id: 0,
        name: ''
    },
    userId: 0,
    createdAt: '',
    updatedAt: '',
    street: '',
    pvzAddress: '',
    deliveryPointAddress: ''
}

const { actions, reducer } = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        setDeliveryData: (
            state,
            {
                payload: { value, name }
            }: PayloadAction<{ value: string; name: keyof DeliveryState }>
        ) => ({
            ...state,
            ...{ [name]: value }
        })
    },
    extraReducers: (builder) => {
        builder.addCase(
            getDeliveryThunk.fulfilled,
            (store, { payload }) => payload
        )
    }
})

export const { setDeliveryData } = actions

export default reducer
