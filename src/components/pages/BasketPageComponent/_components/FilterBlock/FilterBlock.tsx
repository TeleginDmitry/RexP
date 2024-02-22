/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/jsx-no-bind */

import Image from 'next/image'

import MainFilter from '@/src/components/layout/_components/MainFilter'
import { Selector } from '@/src/components/ui/Selector/Selector'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { useFilter } from '@/src/hooks/useFilter'
import { addFilters } from '@/src/store/slices/filter'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { changeIsMain } from '@/src/store/slices/getDelivery'
import type { FilterType } from '@/src/types/Filter/filter.types'
import { editDeliveryCart } from '@/src/utils/api/DeliveryCartMethods'

export const FilterBlock = () => {
    const dispatch = useAppDispatch()

    const { isOpen, toggleOpen } = useFilter()

    const filters = useAppSelector((state) => state.filter)
    const delivery = useAppSelector((state) => state.delivery.data)

    const mainDelivery = delivery.find(({ isMain }) => isMain)

    function changeFilters(newFilters: Partial<FilterType>) {
        dispatch(addFilters(newFilters))
    }

    function applyFilters(filtersData: Partial<FilterType> | undefined) {
        if (filtersData) {
            dispatch(getCartsThunk({ ...filters, ...filtersData }))
        } else {
            dispatch(getCartsThunk(filters))
        }
    }

    const changeMainDelivery = async ({
        id
    }: {
        id: number
        value: number | string
    }) => {
        if (id === mainDelivery?.id) {
            return
        }

        try {
            const response = await editDeliveryCart(id, { isMain: true })
            if (response.status === 200) {
                dispatch(changeIsMain({ id, value: true }))

                if (!mainDelivery?.id) {
                    return
                }

                await editDeliveryCart(mainDelivery.id, { isMain: false })
            }
        } catch (error) {
            /* empty */
        }
    }

    const valuesWithoutSelected = delivery.filter(({ isMain }) => !isMain)

    const countActiveFilters = [
        filters.brands.length === 0,
        filters.sizes.length === 0,
        filters.minPrice === 99 && filters.maxPrice === 3599999,
        filters.orderBy === 'id' && filters.sortBy === 'DESC',
        filters.categoryId === 0 && filters.subCategories.length === 0
    ].reduce((acc, condition) => {
        if (!condition) {
            acc++
        }

        return acc
    }, 0)
    return (
        <div className='flex items-center justify-between mb-3 relative'>
            {mainDelivery || delivery.length ? (
                <Selector
                    values={valuesWithoutSelected.map(
                        ({ id, city, street, house, deliveryType }) => ({
                            id,
                            value: `${deliveryType.id === 1 && 'Пункт СДЭК, '}
                            ${city}
                            ${deliveryType.id === 2 ? `, ${street}` : ''}
                            ${deliveryType.id === 2 ? `, ${house}` : ''}`
                        })
                    )}
                    onChange={changeMainDelivery}
                    defaultValue={
                        mainDelivery
                            ? `${
                                  mainDelivery.deliveryType.id === 1 &&
                                  'Пункт СДЭК, '
                              }
                            ${mainDelivery.city}
                            ${
                                mainDelivery.deliveryType.id === 2
                                    ? `, ${mainDelivery.street}`
                                    : ''
                            }
                            ${
                                mainDelivery.deliveryType.id === 2
                                    ? `, ${mainDelivery.house}`
                                    : ''
                            }`
                            : ''
                    }
                />
            ) : (
                <div />
            )}

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
                    isVisibleCategories
                />
            )}
        </div>
    )
}
