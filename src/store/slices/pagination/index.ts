/* eslint-disable no-restricted-syntax */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { LIMIT, PAGE } from '@/src/constants'
import type { ResponsePaginatedData } from '@/src/types/pagination.types'

interface PaginationState extends ResponsePaginatedData {
    limit: number
    page: number
}

const initialState: PaginationState = {
    limit: LIMIT,
    page: PAGE,
    nextPage: PAGE + 1,
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
        resetPagination() {
            return initialState
        }
    }
})

export default reducer

export const { resetPagination, setPagination } = actions
