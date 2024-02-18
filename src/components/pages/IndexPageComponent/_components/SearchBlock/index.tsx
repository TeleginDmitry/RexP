/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
import { useRef } from 'react'

import Image from 'next/image'

import MainFilter from '@/src/components/layout/_components/MainFilter'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { useFilter } from '@/src/hooks/useFilter'
import { addFilters } from '@/src/store/slices/filter'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { resetPagination } from '@/src/store/slices/pagination'
import type { FilterType } from '@/src/types/Filter/filter.types'

import styles from './styles.module.scss'

export const SearhBlock = () => {
    const dispatch = useAppDispatch()

    const { isOpen, toggleOpen } = useFilter()

    const filters = useAppSelector((state) => state.filter)

    const timeout = useRef<NodeJS.Timeout | null>(null)

    function changeFilters(newFilters: Partial<FilterType>) {
        dispatch(addFilters(newFilters))
    }

    function handleInput(event: React.ChangeEvent) {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            const { value } = event.target as HTMLInputElement

            changeFilters({ name: value })
            dispatch(getProductsThunk({ filters: { ...filters, name: value } }))
        }, 300)
    }

    function applyFilters(filtersData: Partial<FilterType> | undefined) {
        dispatch(resetPagination())

        if (filtersData) {
            dispatch(
                getProductsThunk({ filters: { ...filters, ...filtersData } })
            )
        } else {
            dispatch(getProductsThunk({ filters }))
        }
    }

    const countActiveFilters = [
        filters.brands.length === 0,
        filters.sizes.length === 0,
        filters.minPrice === 99 && filters.maxPrice === 3599999,
        filters.orderBy === 'id' && filters.sortBy === 'DESC'
    ].reduce((acc, condition) => {
        if (!condition) {
            acc++
        }

        return acc
    }, 0)

    return (
        <div className={styles.wrapper}>
            <button>
                <Image
                    src='/images/icons/search.svg'
                    width={21}
                    height={21}
                    alt='search icon'
                />
            </button>
            <input
                onChange={handleInput}
                type='text'
                placeholder='Хей, поищем что-нибудь?'
                className={styles.input}
            />
            <button className='flex items-center' onClick={toggleOpen}>
                <Image
                    src='/images/icons/filters.svg'
                    width={25}
                    height={25}
                    alt='filters icon'
                />
                {!!countActiveFilters && (
                    <span className='w-5 h-5 flex justify-center items-center text-sm text-white rounded-full bg-black'>
                        {countActiveFilters}
                    </span>
                )}
            </button>
            {isOpen && (
                <MainFilter
                    applyFilters={applyFilters}
                    filters={filters}
                    changeFilters={changeFilters}
                    toggleOpen={toggleOpen}
                />
            )}
        </div>
    )
}
