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
}

export const ApplyButton = ({
    applyFilters,
    filters,
    toggleOpen,
    changeSelectedFilter,
    selectedFilter
}: Props) => {
    const isDisables =
        filters.brands.length === 0 &&
        filters.sizes.length === 0 &&
        filters.minPrice === 99 &&
        filters.maxPrice === 3599999 &&
        filters.orderBy === 'id' &&
        filters.sortBy === 'DESC' &&
        filters.categoryId === 0 &&
        filters.subCategories.length === 0

    function onClick() {
        if (selectedFilter === '' || selectedFilter === 'categories') {
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
