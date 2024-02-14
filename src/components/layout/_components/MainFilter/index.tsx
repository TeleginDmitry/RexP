/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react'

import clsx from 'clsx'

import RootIcon from '@/src/components/ui/icons/RootIcon'
import MainContainer from '@/src/components/ui/MainContainer'
import RootButton from '@/src/components/ui/RootButton'
import Portal from '@/src/hocs/Portal'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'
import type { FilterType } from '@/src/types/Filter/filter.types'

import { ApplyButton } from './_components/ApplyButton'
import BrandField from './_components/BrandField'
import CategoriesField from './_components/CategoriesField/CategoriesField'
import SizeField from './_components/SizeField'
import SliderField from './_components/SliderField'
import SortField from './_components/SortField/SortField'

import s from './MainFilter.module.scss'

interface Props {
    filters: FilterType
    changeFilters: (values: FilterType) => void
    applyFilters: (filtersData: Partial<FilterType> | undefined) => void
    toggleOpen: () => void
    isVisibleCategories?: boolean
    isVisibleSort?: boolean
    isOnlyCategories?: boolean
}

const MainFilter = ({
    changeFilters,
    filters,
    applyFilters,
    toggleOpen,
    isVisibleSort = true,
    isVisibleCategories = false,
    isOnlyCategories = false
}: Props) => {
    const brands = useAppSelector((state) => state.brands.data)
    const sizes = useAppSelector((state) => state.colors.data)
    const categories = useAppSelector((state) => state.category.data)

    const [selectedFilter, setSelectedFilter] = useState(
        isOnlyCategories ? 'categories' : ''
    )

    const onHandleClick = () => {
        if (isOnlyCategories) {
            toggleOpen()
            return
        }

        if (selectedFilter) {
            setSelectedFilter('')

            if (selectedFilter === 'categories') {
                applyFilters({
                    ...filters,
                    categoryId: 0,
                    subCategories: []
                })
                changeFilters({
                    ...filters,
                    categoryId: 0,
                    subCategories: []
                })
            }

            if (selectedFilter === 'sort') {
                applyFilters({
                    ...filters,
                    orderBy: 'id',
                    sortBy: 'DESC'
                })
                changeFilters({
                    ...filters,
                    orderBy: 'id',
                    sortBy: 'DESC'
                })
            }

            if (selectedFilter === 'size') {
                applyFilters({
                    ...filters,
                    sizes: []
                })
                changeFilters({
                    ...filters,
                    sizes: []
                })
            }

            if (selectedFilter === 'brand') {
                applyFilters({
                    ...filters,
                    brands: []
                })
                changeFilters({
                    ...filters,
                    brands: []
                })
            }

            return
        }
        toggleOpen()
    }

    function changeSelectedFilter(filter: string) {
        setSelectedFilter(filter)
    }

    function resetFIlters() {
        if (selectedFilter) {
            if (selectedFilter === 'categories') {
                applyFilters({
                    ...filters,
                    categoryId: 0,
                    subCategories: []
                })
                changeFilters({
                    ...filters,
                    categoryId: 0,
                    subCategories: []
                })
            }

            if (selectedFilter === 'sort') {
                applyFilters({
                    ...filters,
                    orderBy: 'id',
                    sortBy: 'DESC'
                })
                changeFilters({
                    ...filters,
                    orderBy: 'id',
                    sortBy: 'DESC'
                })
            }

            if (selectedFilter === 'size') {
                applyFilters({
                    ...filters,
                    sizes: []
                })
                changeFilters({
                    ...filters,
                    sizes: []
                })
            }

            if (selectedFilter === 'brand') {
                applyFilters({
                    ...filters,
                    brands: []
                })
                changeFilters({
                    ...filters,
                    brands: []
                })
            }
            return
        }

        applyFilters({
            brands: [],
            sizes: [],
            categoryId: 0,
            orderBy: 'id',
            sortBy: 'DESC',
            colors: [],
            subCategories: []
        })
        changeFilters({
            ...filters,
            brands: [],
            sizes: [],
            categoryId: 0,
            orderBy: 'id',
            sortBy: 'DESC',
            colors: [],
            subCategories: []
        })
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const neededBrands = brands
        .filter((brand) => filters.brands.includes(String(brand.id)))
        .map((brand) => brand.name)

    const neededSizes = sizes
        .filter((size) => filters.sizes.includes(String(size.id)))
        .map((size) => size.name)

    const neededCategories = categories
        .filter((category) => filters.categoryId === category.id)
        .map((category) => category.name)

    const brandsSliced = neededBrands.slice(0, 2)
    const sizesSliced = neededSizes.slice(0, 2)
    const categoriesSliced = neededCategories.slice(0, 2)

    const isVisibleReset =
        selectedFilter === 'sort'
            ? filters.orderBy !== 'id' || filters.sortBy !== 'DESC'
            : selectedFilter === 'brand'
            ? filters.brands.length !== 0
            : selectedFilter === 'size'
            ? filters.sizes.length !== 0
            : selectedFilter === 'categories'
            ? filters.categoryId !== 0 && filters.subCategories.length !== 0
            : filters.brands.length !== 0 ||
              filters.sizes.length !== 0 ||
              filters.orderBy !== 'id' ||
              filters.sortBy !== 'DESC' ||
              (isVisibleCategories &&
                  filters.categoryId !== 0 &&
                  filters.subCategories.length !== 0)

    return (
        <Portal>
            <MainContainer className={s.wrapper}>
                <div className={`${s.header} relative`}>
                    <RootButton
                        className={s.link}
                        aria-label='Назад'
                        onClick={onHandleClick}
                    >
                        <RootIcon name='arrowLeft' />
                    </RootButton>
                    <h1 className={s.title}>
                        {isOnlyCategories
                            ? 'Категория'
                            : selectedFilter === 'size'
                            ? 'Размер'
                            : selectedFilter === 'brand'
                            ? 'Бренд'
                            : selectedFilter === 'categories'
                            ? 'Категория'
                            : selectedFilter === 'sort'
                            ? 'Сортировка'
                            : 'Фильтры'}
                    </h1>
                    {isVisibleReset && !isOnlyCategories && (
                        <button
                            onClick={resetFIlters}
                            className='absolute right-0 top-3 text-red-600 flex gap-2 items-center text-sm'
                        >
                            Сбросить
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='11'
                                height='11'
                                viewBox='0 0 11 11'
                                fill='none'
                            >
                                <path
                                    d='M10 1L5.5 5.5L10 10'
                                    stroke='#D50000'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <path
                                    d='M1 1L5.5 5.5L1 10'
                                    stroke='#D50000'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </button>
                    )}
                    <div />
                </div>
                <div className={s.filters}>
                    {isVisibleSort && (
                        <RootButton
                            className={s.item}
                            onClick={() => changeSelectedFilter('sort')}
                        >
                            <div className={s.name}>Сортировка</div>
                            <div className={s.sort}>
                                {filters.orderBy === 'id' &&
                                filters.sortBy === 'DESC'
                                    ? 'Сначала новые'
                                    : filters.orderBy === 'id' &&
                                      filters.sortBy === 'ASC'
                                    ? 'Сначала старые'
                                    : filters.orderBy === 'price' &&
                                      filters.sortBy === 'DESC'
                                    ? 'Сначала дорогие'
                                    : 'Сначала дешёвые'}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='6'
                                    height='10'
                                    viewBox='0 0 6 10'
                                    fill='none'
                                >
                                    <path
                                        d='M0.5 0.5L5 5L0.5 9.5'
                                        stroke='#8E8E8E'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                </svg>
                            </div>
                        </RootButton>
                    )}
                    {isVisibleCategories && (
                        <RootButton
                            className={s.item}
                            onClick={() => changeSelectedFilter('categories')}
                        >
                            <div className={s.name}>Категории</div>
                            <div className={s.sort}>
                                {categoriesSliced.length
                                    ? `${categoriesSliced.join(', ')}${
                                          categoriesSliced.length <
                                          neededCategories.length
                                              ? '...'
                                              : ''
                                      }`
                                    : 'Все'}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='6'
                                    height='10'
                                    viewBox='0 0 6 10'
                                    fill='none'
                                >
                                    <path
                                        d='M0.5 0.5L5 5L0.5 9.5'
                                        stroke='#8E8E8E'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                    />
                                </svg>
                            </div>
                        </RootButton>
                    )}

                    <RootButton
                        className={s.item}
                        onClick={() => changeSelectedFilter('size')}
                    >
                        <div className={s.name}>Размер</div>
                        <div className={s.sort}>
                            {sizesSliced.length
                                ? `${sizesSliced.join(', ')}${
                                      sizesSliced.length < neededSizes.length
                                          ? '...'
                                          : ''
                                  }`
                                : 'Все'}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='6'
                                height='10'
                                viewBox='0 0 6 10'
                                fill='none'
                            >
                                <path
                                    d='M0.5 0.5L5 5L0.5 9.5'
                                    stroke='#8E8E8E'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </div>
                    </RootButton>
                    <RootButton
                        className={s.item}
                        onClick={() => changeSelectedFilter('brand')}
                    >
                        <div className={s.name}>Бренд</div>
                        <div className={s.sort}>
                            {brandsSliced.length
                                ? `${brandsSliced.join(', ')}${
                                      brandsSliced.length < neededBrands.length
                                          ? '...'
                                          : ''
                                  }`
                                : 'Все'}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='6'
                                height='10'
                                viewBox='0 0 6 10'
                                fill='none'
                            >
                                <path
                                    d='M0.5 0.5L5 5L0.5 9.5'
                                    stroke='#8E8E8E'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </div>
                    </RootButton>
                    <div
                        className={clsx(
                            s.subFilter,
                            !!selectedFilter && s.active
                        )}
                    >
                        {selectedFilter === 'size' && (
                            <SizeField
                                filters={filters}
                                changeFilters={changeFilters}
                            />
                        )}
                        {selectedFilter === 'brand' && (
                            <BrandField
                                filters={filters}
                                changeFilters={changeFilters}
                            />
                        )}
                        {selectedFilter === 'categories' && (
                            <CategoriesField
                                changeFilters={changeFilters}
                                filters={filters}
                            />
                        )}
                        {selectedFilter === 'sort' && (
                            <SortField
                                changeFilters={changeFilters}
                                filters={filters}
                            />
                        )}
                    </div>
                    <SliderField
                        applyFilters={applyFilters}
                        changeFilters={changeFilters}
                        filters={filters}
                    />
                </div>
                <ApplyButton
                    changeSelectedFilter={changeSelectedFilter}
                    selectedFilter={selectedFilter}
                    toggleOpen={toggleOpen}
                    filters={filters}
                    applyFilters={applyFilters}
                    isOnlyCategories={isOnlyCategories}
                />
            </MainContainer>
        </Portal>
    )
}

export default MainFilter
