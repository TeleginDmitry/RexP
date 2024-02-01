/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { LIMIT, MAX_PRICE, MIN_PRICE, PAGE } from '@/src/constants'

import type { FilterState } from './types'

const initialState: FilterState = {
    brands: [],
    colors: [],
    sizes: [],
    maxPrice: MAX_PRICE,
    minPrice: MIN_PRICE,
    orderBy: 'id',
    sortBy: 'DESC',
    subCategories: []
}

const { reducer, actions } = createSlice({
    name: 'mainFilter',
    initialState,
    reducers: {
        addFilters(state, { payload }: PayloadAction<Partial<FilterState>>) {
            return {
                ...state,
                ...payload,
                limit: LIMIT,
                page: PAGE
            }
        }
    }
})

export default reducer

export const { addFilters } = actions
