/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import MainFilter from '@/src/components/layout/_components/MainFilter'
import { LIMIT, PAGE } from '@/src/constants'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { useFilter } from '@/src/hooks/useFilter'
import { addFilters } from '@/src/store/slices/filter'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { resetPagination, setPagination } from '@/src/store/slices/pagination'
import type { FilterType } from '@/src/types/Filter/filter.types'

import styles from './styles.module.scss'

export const SearhBlock = () => {
    const [oldPos, setOldPos] = useState<number | null>(null)
    const [sticky, setSticky] = useState(false)

    const searchRef = useRef<any | null | undefined>()
    const oldPosRef = useRef<any | null | undefined>()
    oldPosRef.current = oldPos
    const dispatch = useAppDispatch()

    const { isOpen, toggleOpen } = useFilter()

    const filters = useAppSelector((state) => state.filter.main)
    const filtersRef = useRef<FilterType>(filters)

    const [value, setValue] = useState(filters.name)

    const timeout = useRef<NodeJS.Timeout | null>(null)

    function changeFilters(newFilters: Partial<FilterType>) {
        dispatch(addFilters({ page: 'main', value: newFilters }))
    }

    function handleInput(event: React.ChangeEvent) {
        const { value } = event.target as HTMLInputElement

        setValue(value)

        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(() => {
            changeFilters({ name: value })
            dispatch(getProductsThunk({ filters: { ...filters, name: value } }))
        }, 300)
    }

    async function applyFilters(filtersData: Partial<FilterType> | undefined) {
        dispatch(resetPagination())

        if (filtersData) {
            const result = await dispatch(
                getProductsThunk({
                    filters: {
                        ...filters,
                        ...filtersData,
                        limit: LIMIT,
                        page: PAGE
                    }
                })
            ).unwrap()

            dispatch(
                setPagination({
                    nextPage: result.nextPage,
                    totalItems: result.totalItems,
                    totalPages: result.totalPages,
                    page: PAGE + 1
                })
            )
        } else {
            const result = await dispatch(
                getProductsThunk({
                    filters: { ...filters, limit: LIMIT, page: PAGE }
                })
            ).unwrap()

            dispatch(
                setPagination({
                    nextPage: result.nextPage,
                    totalItems: result.totalItems,
                    totalPages: result.totalPages,
                    page: PAGE + 1
                })
            )
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

    useEffect(() => {
        if (searchRef.current) {
            if (!oldPosRef.current) {
                setOldPos(searchRef.current.offsetTop - 10)
            }
            window.onscroll = () => {
                if (
                    searchRef.current &&
                    oldPosRef.current &&
                    filtersRef.current &&
                    window.scrollY > oldPosRef.current &&
                    filtersRef.current.name
                ) {
                    setSticky(true)
                } else {
                    setSticky(false)
                }
            }
        }
    }, [searchRef])

    return (
        <div ref={searchRef} className={`${sticky ? styles.sticky : ''}`}>
            <div className={`${styles.wrapper}`}>
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
                    value={value}
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
        </div>
    )
}
