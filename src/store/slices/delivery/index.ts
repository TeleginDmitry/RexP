import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { DeliveryCreate } from '@/src/utils/api/DeliveryCartMethods'

import { getDeliveryThunk } from './thunks/getDelivery'
import type { DeliveryState } from './types'

const initialState: DeliveryState = {
    city: '',
    house: '',
    flat: '',
    patronymic: '',
    firstName: '',
    lastName: '',
    number: '',
    address: '',
    isMain: false,
    deliveryType: {
        id: 1,
        name: ''
    },
    street: '',
    deliveryPointAddress: ''
}

const { actions, reducer } = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        setDeliveryData: (
            state,
            {
                payload: { value }
            }: PayloadAction<{ value: Partial<DeliveryCreate> }>
        ) => ({
            ...state,
            ...value
        }),
        clear: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(
            getDeliveryThunk.fulfilled,
            (store, { payload }) => payload
        )
    }
})

export const { setDeliveryData, clear } = actions

export default reducer
