/* eslint-disable react/jsx-no-bind */
import React from 'react'

import { CheckboxGroup } from '@nextui-org/react'

import RootCheckbox from '@/src/components/ui/RootCheckbox'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'
import type { FilterType } from '@/src/types/Filter/filter.types'

import s from './CategoriesField.module.scss'

interface Props {
    filters: FilterType
    changeFilters: (values: Partial<FilterType>) => void
}

const CategoriesField = ({ changeFilters, filters }: Props) => {
    const categories = useAppSelector((state) => state.category.data)

    const handleCheckboxChange = (category: number) => {
        if (category === 0) {
            changeFilters({ categoryId: undefined })
        }

        changeFilters({ categoryId: category })
    }

    function onValueChangeGroup(values: string[]) {
        changeFilters({ subCategories: values })
    }

    return (
        <div className={s.wrapper}>
            <RootCheckbox
                value='0'
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
                        isSelected={filters.categoryId === id}
                        onChange={() => handleCheckboxChange(id)}
                        value={`${id}`}
                    >
                        <div className={s.categoryWrapper}>
                            <div className={s.name}>{name}</div>
                        </div>
                    </RootCheckbox>
                    {!!subCategories.length && (
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
                                        <div className={s.categoryWrapper}>
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
