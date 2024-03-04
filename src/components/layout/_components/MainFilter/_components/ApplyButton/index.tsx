/* eslint-disable react/jsx-no-bind */

import { Button } from '@nextui-org/react'

import type { FilterType } from '@/src/types/Filter/filter.types'

import s from './styles.module.scss'

interface Props {
    applyFilters: (filtersData: Partial<FilterType> | undefined) => void
    filters: FilterType
    toggleOpen: () => void
    changeSelectedFilter: (filter: string) => void
    selectedFilter: string
    isOnlyCategories: boolean
}

export const ApplyButton = ({
    applyFilters,
    filters,
    toggleOpen,
    changeSelectedFilter,
    selectedFilter,
    isOnlyCategories
}: Props) => {
    const isDisables =
        filters.brands.length === 0 &&
        filters.sizes.length === 0 &&
        filters.minPrice === 99 &&
        filters.maxPrice === 3599999 &&
        !filters.orderBy &&
        !filters.sortBy &&
        filters.categoryId === 0 &&
        filters.subcategories.length === 0

    function onClick() {
        if (selectedFilter === '' || isOnlyCategories) {
            applyFilters(undefined)
            toggleOpen()
        } else {
            changeSelectedFilter('')
        }
    }

    return (
        <Button onClick={onClick} className={s.button} disabled={isDisables}>
            {selectedFilter ? 'Выбрать' : 'Применить'}
        </Button>
    )
}
