/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'

import { Selector } from '@/src/components/ui/Selector/Selector'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'

export const FilterBlock = () => {
    const dispatch = useAppDispatch()

    const filters = useAppSelector((state) => state.filter)

    const [selectedValue, setSelectedValue] = useState('Сначала новые')

    function changeSelectedValue({ value }: { id: number; value: string }) {
        setSelectedValue(value)

        const orderBy =
            value === 'Сначала новые' || value === 'Сначала старые'
                ? 'id'
                : 'price'
        const sortBy =
            ((value === 'Сначала дорогие' || value === 'Сначала новые') &&
                'DESC') ||
            ((value === 'Сначала дешёвые' || value === 'Сначала старые') &&
                'ASC') ||
            'DESC'

        dispatch(getFavoritesThunk({ ...filters, orderBy, sortBy }))
    }

    return (
        <div className='flex items-center justify-between mb-3'>
            <Selector
                values={[
                    { id: 1, value: 'Сначала новые' },
                    { id: 2, value: 'Сначала старые' },
                    { id: 3, value: 'Сначала дорогие' },
                    { id: 4, value: 'Сначала дешёвые' }
                ].filter((value) => value.value !== selectedValue)}
                defaultValue={selectedValue}
                onChange={changeSelectedValue}
            />
        </div>
    )
}
