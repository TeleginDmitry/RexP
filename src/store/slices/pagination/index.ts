/* eslint-disable no-restricted-syntax */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { LIMIT, PAGE } from '@/src/constants'

interface PaginationState {
    limit: number
    page: number
    totalItems: number | null
    totalPages: number | null
}

const initialState: PaginationState = {
    limit: LIMIT,
    page: PAGE,
    totalItems: null,
    totalPages: null
}

const { reducer, actions } = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPagination(state, action: PayloadAction<Partial<PaginationState>>) {
            return { ...state, ...action.payload }
        },
        resetPagination(state) {
            state.limit = LIMIT
            state.page = PAGE
            state.totalItems = null
            state.totalPages = null
        }
    }
})

export default reducer

export const { resetPagination, setPagination } = actions
