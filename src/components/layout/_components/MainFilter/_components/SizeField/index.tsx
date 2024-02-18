/* eslint-disable react/jsx-no-bind */

import { CheckboxGroup } from '@nextui-org/react'

import RootCheckbox from '@/src/components/ui/RootCheckbox'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'
import type { FilterType } from '@/src/types/Filter/filter.types'

import s from './ColorField.module.scss'

interface Props {
    filters: FilterType
    changeFilters: (values: Partial<FilterType>) => void
}

const SizeField = ({ changeFilters, filters }: Props) => {
    const sizes = useAppSelector((state) => state.sizes.data)

    function onValueChangeGroup(values: string[]) {
        changeFilters({ sizes: values })
    }

    function onValueChangeMain(isSelected: boolean) {
        if (isSelected) {
            changeFilters({ sizes: [] })
        }
    }

    return (
        <div className={s.wrapper}>
            <RootCheckbox
                onValueChange={onValueChangeMain}
                isSelected={filters.sizes.length === 0}
            >
                <div className={s.name}>Все размеры</div>
            </RootCheckbox>
            <CheckboxGroup
                value={filters.sizes}
                onValueChange={onValueChangeGroup}
            >
                {sizes.map((size) => (
                    <RootCheckbox key={size.id} value={`${size.id}`}>
                        <div className={s.name}>{size.name}</div>
                    </RootCheckbox>
                ))}
            </CheckboxGroup>
        </div>
    )
}

export default SizeField
