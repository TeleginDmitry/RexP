/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-bind */
import React from 'react'

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

    const handleCheckboxChange = (category: number) => {
        if (category !== 0) {
            dispatch(getSizesThunk(category))
        }

        changeFilters({ categoryId: category })
    }

    function onValueChangeGroup(values: string[]) {
        changeFilters({ subcategories: values })
    }

    return (
        <div className={s.wrapper}>
            <RootCheckbox
                isSelected={filters.categoryId === 0}
                onChange={() => {
                    changeFilters({ sizes: [] })
                    handleCheckboxChange(0)
                }}
            >
                <div className={s.categoryWrapper}>
                    <div className={s.name}>Все категории</div>
                </div>
            </RootCheckbox>
            {categories.map(({ id, name, subcategories }) => (
                <>
                    <RootCheckbox
                        key={id}
                        isSelected={
                            filters.categoryId === id &&
                            filters.subcategories.length ===
                                subcategories.length
                        }
                        onChange={() => {
                            changeFilters({
                                subcategories: subcategories.map(({ id }) =>
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
                    {id === filters.categoryId && !!subcategories.length && (
                        <CheckboxGroup
                            value={filters.subcategories}
                            onValueChange={onValueChangeGroup}
                        >
                            {subcategories.map(
                                ({ id: subId, name: subName }) => (
                                    <RootCheckbox
                                        key={subId}
                                        value={`${subId}`}
                                    >
                                        <div
                                            className={`${s.subCategory} pl-4`}
                                        >
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
