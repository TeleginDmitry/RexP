/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react'

import clsx from 'clsx'

interface Props {
    values: Array<{ id: number; value: number | string }>
    defaultValue?: string | null
    onChange?: (props: { id: number; value: number | string }) => void
}

export const Selector = ({ values, defaultValue, onChange }: Props) => {
    const [isVisibleSelect, setIsVisibleSelect] = useState(false)

    return (
        <div
            className={`${clsx({
                'rounded-xl': !isVisibleSelect,
                'rounded-t-xl': isVisibleSelect
            })} relative bg-black py-2 px-3 text-white text-sm cursor-pointer z-50`}
        >
            <span
                className='flex items-center gap-2'
                onClick={() => {
                    if (values.length > 1) {
                        setIsVisibleSelect((state) => !state)
                    }
                }}
            >
                {defaultValue ?? 'Выбрать'}{' '}
                {isVisibleSelect ? (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='12'
                        height='8'
                        viewBox='0 0 10 6'
                        fill='none'
                    >
                        <path
                            d='M1 5L5 0.999969L9 5'
                            stroke='white'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='12'
                        height='8'
                        viewBox='0 0 10 6'
                        fill='none'
                    >
                        <path
                            d='M9 1L5 5.00003L1 1'
                            stroke='white'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                        />
                    </svg>
                )}
            </span>

            {isVisibleSelect && (
                <div className='flex flex-col absolute top-full left-0 w-full shadow-lg overflow-hidden rounded-b-xl'>
                    {values.map(({ id, value }) => (
                        <span
                            onClick={() => {
                                onChange?.({ id, value })
                                setIsVisibleSelect(false)
                            }}
                            className='text-sm cursor-pointer py-2 px-3 bg-white hover:bg-black hover:text-white text-[#8E8E8E]'
                            key={id}
                        >
                            {value}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}
