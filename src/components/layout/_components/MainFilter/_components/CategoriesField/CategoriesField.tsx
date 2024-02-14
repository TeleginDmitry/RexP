/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'

import { CheckboxGroup } from '@nextui-org/react'

import RootCheckbox from '@/src/components/ui/RootCheckbox'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'
import type { FilterType } from '@/src/types/Filter/filter.types'

import s from './CategoriesField.module.scss'

interface Props {
    filters: FilterType
    changeFilters: (values: Partial<FilterType>) => void
}

const CategoriesField = ({ changeFilters, filters }: Props) => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector((state) => state.category.data)

    const [isActiveCategory, setIsActiveCategory] = useState<number | null>(
        null
    )

    const handleCheckboxChange = (category: number) => {
        dispatch(getSizesThunk(category))
        if (category === 0) {
            changeFilters({ categoryId: undefined })
        }

        setIsActiveCategory(category)

        changeFilters({ categoryId: category })
    }

    function onValueChangeGroup(values: string[]) {
        changeFilters({ subCategories: values })
    }

    return (
        <div className={s.wrapper}>
            <RootCheckbox
                isSelected={filters.categoryId === 0}
                onChange={() => handleCheckboxChange(0)}
            >
                <div className={s.categoryWrapper}>
                    <div className={s.name}>Все категории</div>
                </div>
            </RootCheckbox>
            {categories.map(({ id, name, subCategories }) => (
                <>
                    <RootCheckbox
                        key={id}
                        isSelected={
                            filters.categoryId === id &&
                            filters.subCategories.length ===
                                subCategories.length
                        }
                        onChange={() => {
                            changeFilters({
                                subCategories: subCategories.map(({ id }) =>
                                    id.toString()
                                )
                            })
                            handleCheckboxChange(id)
                        }}
                    >
                        <div className={s.categoryWrapper}>
                            <div className={s.name}>{name}</div>
                        </div>
                    </RootCheckbox>
                    {isActiveCategory === id && !!subCategories.length && (
                        <CheckboxGroup
                            value={filters.subCategories}
                            onValueChange={onValueChangeGroup}
                        >
                            {subCategories.map(
                                ({ id: subId, name: subName }) => (
                                    <RootCheckbox
                                        key={subId}
                                        value={`${subId}`}
                                        className='pl-4'
                                    >
                                        <div className={s.subCategory}>
                                            <div className={s.name}>
                                                {subName}
                                            </div>
                                        </div>
                                    </RootCheckbox>
                                )
                            )}
                        </CheckboxGroup>
                    )}
                </>
            ))}
        </div>
    )
}

export default CategoriesField
