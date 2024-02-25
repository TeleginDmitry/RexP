/* eslint-disable react/jsx-no-bind */
import { Tab, Tabs } from '@nextui-org/react'
import clsx from 'clsx'

import MainFilter from '@/src/components/layout/_components/MainFilter'
import RootIcon from '@/src/components/ui/icons/RootIcon'
import RootButton from '@/src/components/ui/RootButton'
import { LIMIT, PAGE } from '@/src/constants'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { useFilter } from '@/src/hooks/useFilter'
import { addFilters } from '@/src/store/slices/filter'
import type { FilterState } from '@/src/store/slices/filter/types'
import { resetProducts } from '@/src/store/slices/getProducts'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'
import { resetPagination, setPagination } from '@/src/store/slices/pagination'
import type { FilterType } from '@/src/types/Filter/filter.types'

import s from './TabsBlock.module.scss'

const TabsBlock = () => {
    const dispatch = useAppDispatch()

    const { isOpen, toggleOpen } = useFilter()

    const categories = useAppSelector((state) => state.category.data)

    const filters = useAppSelector((state) => state.filter)

    function changeFilters(newFilters: Partial<FilterType>) {
        dispatch(addFilters(newFilters))
    }

    const onHandleChange = async (categoryId: string) => {
        const categoryIdNum = +categoryId

        if (categoryIdNum === filters.categoryId) {
            return
        }
        dispatch(resetPagination())

        const foundCategory = categories.find(({ id }) => id === categoryIdNum)

        if (categoryIdNum !== 0) {
            dispatch(getSizesThunk(categoryIdNum))
        }

        const needValues: Partial<FilterState> = {
            categoryId: categoryIdNum,
            subCategories: foundCategory
                ? foundCategory.subCategories.map(({ id }) => `${id}`)
                : []
        }

        if (categoryIdNum === 0) {
            needValues.sizes = []
        }

        const result = await dispatch(
            getProductsThunk({
                filters: { ...filters, ...needValues, limit: LIMIT, page: PAGE }
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

        changeFilters(needValues)
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

    return (
        <div className={s.wrapper}>
            <Tabs
                aria-label='Options'
                color='primary'
                variant='light'
                selectedKey={filters.categoryId?.toString() ?? '0'}
                onSelectionChange={onHandleChange}
                classNames={{
                    tabList: clsx(s.tabList),
                    cursor: clsx(s.cursor),
                    tab: clsx('max-w-fit px-[12px] h-[28px]', s.tab),
                    tabContent: clsx(s.tabContent, 'text-[#8e8e8e]'),
                    base: clsx(s.base, s.default)
                }}
            >
                <Tab
                    key={0}
                    className={clsx(s.tab)}
                    title={<div>Все товары</div>}
                />
                {categories.map(({ id, name }) => (
                    <Tab
                        key={id}
                        className={clsx(s.tab)}
                        title={<div>{name}</div>}
                    />
                ))}
            </Tabs>
            <RootButton onClick={toggleOpen} className={s.button}>
                Все <RootIcon name='arrow' />
            </RootButton>

            {isOpen && (
                <MainFilter
                    changeFilters={changeFilters}
                    applyFilters={applyFilters}
                    toggleOpen={toggleOpen}
                    isOnlyCategories
                    filters={filters}
                />
            )}
        </div>
    )
}

export default TabsBlock
