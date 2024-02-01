/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react/jsx-no-bind */
import React from 'react'

import RootCheckbox from '@/src/components/ui/RootCheckbox'
import type { FilterType } from '@/src/types/Filter/filter.types'

import s from './SortField.module.scss'

interface Props {
    filters: FilterType
    changeFilters: (values: Partial<FilterType>) => void
}

const SortField = ({ changeFilters, filters }: Props) => {
    const handleCheckboxChange = (values: string) => {
        const valuesArray = values.split(',') as [
            'id' | 'price',
            'ASC' | 'DESC'
        ]
        changeFilters({ orderBy: valuesArray[0], sortBy: valuesArray[1] })
    }

    const selectedCheckbox = `${filters.orderBy},${filters.sortBy}`
    return (
        <div className={s.wrapper}>
            <RootCheckbox
                value='id,DESC'
                isSelected={selectedCheckbox === 'id,DESC'}
                onChange={() => handleCheckboxChange('id,DESC')}
            >
                <div className={s.categoryWrapper}>
                    <div className={s.name}>Сначала новые</div>
                </div>
            </RootCheckbox>
            <RootCheckbox
                value='id,ASC'
                isSelected={selectedCheckbox === 'id,ASC'}
                onChange={() => handleCheckboxChange('id,ASC')}
            >
                <div className={s.categoryWrapper}>
                    <div className={s.name}>Сначала старые</div>
                </div>
            </RootCheckbox>
            <RootCheckbox
                value='price,DESC'
                isSelected={selectedCheckbox === 'price,DESC'}
                onChange={() => handleCheckboxChange('price,DESC')}
            >
                <div className={s.categoryWrapper}>
                    <div className={s.name}>Сначала дорогие</div>
                </div>
            </RootCheckbox>
            <RootCheckbox
                value='price,ASC'
                isSelected={selectedCheckbox === 'price,ASC'}
                onChange={() => handleCheckboxChange('price,ASC')}
            >
                <div className={s.categoryWrapper}>
                    <div className={s.name}>Сначала дешёвые</div>
                </div>
            </RootCheckbox>
        </div>
    )
}

export default SortField
