/* eslint-disable react/jsx-no-bind */

import Image from 'next/image'

import MainFilter from '@/src/components/layout/_components/MainFilter'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { useFilter } from '@/src/hooks/useFilter'
import { addFilters } from '@/src/store/slices/filter'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import type { FilterType } from '@/src/types/Filter/filter.types'

export const FilterBlock = () => {
    const dispatch = useAppDispatch()

    const { isOpen, toggleOpen } = useFilter()

    const filters = useAppSelector((state) => state.filter)

    function changeFilters(newFilters: Partial<FilterType>) {
        dispatch(addFilters(newFilters))
    }

    function applyFilters() {
        dispatch(getFavoritesThunk({ ...filters }))
    }

    return (
        <div className='flex items-center justify-end mb-3'>
            <button onClick={toggleOpen}>
                <Image
                    src='/images/icons/filters.svg'
                    width={25}
                    height={25}
                    alt='filters icon'
                />
            </button>

            {isOpen && (
                <MainFilter
                    applyFilters={applyFilters}
                    filters={filters}
                    changeFilters={changeFilters}
                    toggleOpen={toggleOpen}
                    isVisibleCategories
                />
            )}
        </div>
    )
}
