/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { LIMIT, MAX_PRICE, MIN_PRICE, PAGE } from '@/src/constants'
import type { FilterType } from '@/src/types/Filter/filter.types'

import type { FilterState } from './types'

const initialState: FilterState = {
    basket: {
        brands: [],
        colors: [],
        sizes: [],
        maxPrice: MAX_PRICE,
        minPrice: MIN_PRICE,
        orderBy: 'id',
        sortBy: 'DESC',
        subcategories: [],
        categoryId: 0
    },
    main: {
        brands: [],
        colors: [],
        sizes: [],
        maxPrice: MAX_PRICE,
        minPrice: MIN_PRICE,
        orderBy: 'id',
        sortBy: 'DESC',
        subcategories: [],
        categoryId: 0
    }
}

interface AddFiltersType {
    page: keyof FilterState
    value: Partial<FilterType>
}

const { reducer, actions } = createSlice({
    name: 'mainFilter',
    initialState,
    reducers: {
        addFilters(state, { payload }: PayloadAction<Partial<AddFiltersType>>) {
            return {
                ...state,
                [payload.page ?? 'main']: {
                    ...state[payload.page ?? 'main'],
                    ...payload.value,
                    limit: LIMIT,
                    page: PAGE
                }
            }
        }
    }
})

export default reducer

export const { addFilters } = actions
