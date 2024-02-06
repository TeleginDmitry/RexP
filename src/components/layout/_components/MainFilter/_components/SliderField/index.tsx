/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
import { useRef, useState } from 'react'

import { Slider } from '@nextui-org/react'
import clsx from 'clsx'

import { MAX_PRICE, MIN_PRICE } from '@/src/constants'
import type { FilterType } from '@/src/types/Filter/filter.types'

import s from '../../MainFilter.module.scss'

interface Props {
    filters: FilterType
    changeFilters: (values: Partial<FilterType>) => void
    applyFilters: (filtersData: Partial<FilterType> | undefined) => void
}
const SliderField = ({ changeFilters, filters, applyFilters }: Props) => {
    const timeout = useRef<NodeJS.Timeout | null>(null)

    const { minPrice, maxPrice } = filters

    const [value, setValue] = useState([minPrice, maxPrice])

    function onChange(sliderValue: number[]) {
        setValue(sliderValue)

        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            changeFilters({
                minPrice: sliderValue[0],
                maxPrice: sliderValue[1]
            })
        }, 300)
    }

    function resetFIlters() {
        setValue([MIN_PRICE, MAX_PRICE])
        changeFilters({
            ...filters,
            maxPrice: MAX_PRICE,
            minPrice: MIN_PRICE
        })

        applyFilters({
            minPrice: MIN_PRICE,
            maxPrice: MAX_PRICE
        })
    }

    function onChangeInputValueLeft(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value: newValue } = event.target

        setValue((state) => [+newValue, state[1]])

        changeFilters({ minPrice: +newValue, maxPrice: value[1] })
    }

    function onChangeInputValueRight(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value: newValue } = event.target

        setValue((state) => [state[0], +newValue])

        changeFilters({ minPrice: value[0], maxPrice: +newValue })
    }

    const isVisibleReset = value[0] !== MIN_PRICE || value[1] !== MAX_PRICE
    return (
        <div className='flex flex-col gap-[16px] w-full mt-[16px]  items-start justify-center'>
            <div className='flex items-center justify-between w-full'>
                <span className={s['price-title']}>Цена</span>
                {isVisibleReset && (
                    <button
                        onClick={resetFIlters}
                        className='flex gap-2 items-center'
                    >
                        Сбросить
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='11'
                            height='10'
                            viewBox='0 0 11 10'
                            fill='none'
                        >
                            <path
                                d='M10 0.5L5.5 5L10 9.5'
                                stroke='black'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                            <path
                                d='M1 0.5L5.5 5L1 9.5'
                                stroke='black'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div className={s.range}>
                {Array.isArray(value) && (
                    <>
                        <label
                            className={clsx(
                                s.from,
                                value[0] !== MIN_PRICE && s.active,
                                'flex items-center gap-2 w-full'
                            )}
                        >
                            <span>От</span>
                            <input
                                onChange={onChangeInputValueLeft}
                                className='w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                value={value[0] === MIN_PRICE ? '' : value[0]}
                                max={MAX_PRICE}
                                min={MIN_PRICE}
                                inputMode='numeric'
                                type='number'
                                placeholder={
                                    value[0] === 0
                                        ? ''
                                        : new Intl.NumberFormat('ru-RU').format(
                                              value[0]
                                          )
                                }
                            />
                        </label>
                        <label
                            className={clsx(
                                s.to,
                                value[1] !== MAX_PRICE && s.active,
                                'flex items-center gap-2 w-full'
                            )}
                        >
                            <span>До</span>
                            <input
                                onChange={onChangeInputValueRight}
                                className='w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                type='number'
                                max={MAX_PRICE}
                                min={MIN_PRICE}
                                inputMode='numeric'
                                value={value[1] === MAX_PRICE ? '' : value[1]}
                                placeholder={
                                    value[1] === 0
                                        ? ''
                                        : new Intl.NumberFormat('ru-RU').format(
                                              value[1]
                                          )
                                }
                            />
                        </label>
                    </>
                )}
            </div>
            <Slider
                size='sm'
                formatOptions={{ style: 'currency', currency: 'USD' }}
                step={10}
                maxValue={MAX_PRICE}
                minValue={MIN_PRICE}
                value={value}
                onChange={onChange}
                className={s.mainSlider}
            />
        </div>
    )
}

export default SliderField
