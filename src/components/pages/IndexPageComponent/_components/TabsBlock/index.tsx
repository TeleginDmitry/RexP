/* eslint-disable react/jsx-no-bind */
import { Tab, Tabs } from '@nextui-org/react'
import clsx from 'clsx'

import MainFilter from '@/src/components/layout/_components/MainFilter'
import RootIcon from '@/src/components/ui/icons/RootIcon'
import RootButton from '@/src/components/ui/RootButton'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { useFilter } from '@/src/hooks/useFilter'
import { addFilters } from '@/src/store/slices/filter'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { resetPagination } from '@/src/store/slices/pagination'
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

    const onHandleChange = (categoryId: string) => {
        const categoryIdNum = +categoryId

        if (+categoryIdNum === filters.categoryId) {
            return
        }

        changeFilters({ categoryId: categoryIdNum })

        dispatch(
            getProductsThunk({
                filters: { ...filters, categoryId: categoryIdNum }
            })
        )
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
                    tabContent: clsx(s.tabContent),
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
