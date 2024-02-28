/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react'
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/material.css'

import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getCityThunk } from '@/src/store/slices/city/thunks/getDelivery'
import type { DeliveryState } from '@/src/store/slices/delivery/types'
import { getDeliveryPointsThunk } from '@/src/store/slices/deliveryPoints/thunks/getDelivery'

import s from './InputsBlock.module.scss'

interface Props {
    currentAddress: DeliveryState
    onHandleChange: (value: Partial<DeliveryState>) => void
    activeTab: 'Курьером' | 'Пункт выдачи заказа'
}

const InputsBlock = ({ currentAddress, onHandleChange, activeTab }: Props) => {
    const dispatch = useAppDispatch()

    const cities = useAppSelector((state) => state.city)
    const deliveryPoints = useAppSelector((state) => state.deliveryPoints)

    return (
        <div className={s.wrapper}>
            <div className={s.title}>Адрес</div>
            <div className={s.inputs}>
                <Autocomplete
                    allowsCustomValue
                    label='Город'
                    variant='bordered'
                    classNames={{
                        base: s.base,
                        popoverContent: s.popoverContent,
                        listbox: s.listbox
                    }}
                    className={s.autocomplete}
                    onValueChange={(value) => {
                        dispatch(getCityThunk(value))
                    }}
                    defaultItems={cities}
                    defaultSelectedKey={currentAddress.city}
                >
                    {({ city, code }) => (
                        <AutocompleteItem
                            onClick={() => {
                                onHandleChange({ city })
                                dispatch(getDeliveryPointsThunk(code))
                            }}
                            key={city}
                            className={s.item}
                        >
                            {city}
                        </AutocompleteItem>
                    )}
                </Autocomplete>
                {activeTab === 'Пункт выдачи заказа' && (
                    <Autocomplete
                        allowsCustomValue
                        label='Адрес ПВЗ СДЕК'
                        variant='bordered'
                        classNames={{
                            base: s.base,
                            popoverContent: s.popoverContent,
                            listbox: s.listbox
                        }}
                        className={s.autocomplete}
                        defaultItems={deliveryPoints}
                        defaultSelectedKey={currentAddress.deliveryPointAddress}
                    >
                        {({ address, address_full }) => (
                            <AutocompleteItem
                                onClick={() => {
                                    onHandleChange({
                                        deliveryPointAddress: address_full
                                    })
                                }}
                                key={address_full}
                                className={s.item}
                            >
                                {address}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                )}
                {activeTab === 'Курьером' && (
                    <>
                        <Input
                            type='text'
                            label='Улица'
                            value={currentAddress.street}
                            className={s.inputUi}
                            classNames={{
                                inputWrapper: 'shadow-none'
                            }}
                            onChange={(e) =>
                                onHandleChange({ street: e.target.value })
                            }
                        />
                        <div className={s.inputs_row}>
                            <Input
                                type='text'
                                label='Дом'
                                className={s.inputUi}
                                value={currentAddress.house ?? ''}
                                classNames={{
                                    inputWrapper: 'shadow-none'
                                }}
                                onChange={(e) =>
                                    onHandleChange({ house: e.target.value })
                                }
                            />
                            <Input
                                type='text'
                                label='Квартира'
                                value={currentAddress.flat ?? ''}
                                className={s.inputUi}
                                classNames={{
                                    inputWrapper: 'shadow-none'
                                }}
                                onChange={(e) =>
                                    onHandleChange({ flat: e.target.value })
                                }
                            />
                        </div>
                    </>
                )}
            </div>
            <div className={s.title}>Получатель</div>
            <div className={s.inputs}>
                <Input
                    type='text'
                    label='Фамилия'
                    value={currentAddress.lastName}
                    className={s.inputUi}
                    classNames={{
                        inputWrapper: 'shadow-none'
                    }}
                    onChange={(e) =>
                        onHandleChange({ lastName: e.target.value })
                    }
                />
                <Input
                    type='text'
                    label='Имя'
                    value={currentAddress.firstName}
                    className={s.inputUi}
                    classNames={{
                        inputWrapper: 'shadow-none'
                    }}
                    onChange={(e) =>
                        onHandleChange({ firstName: e.target.value })
                    }
                />
                <Input
                    type='text'
                    label='Отчество'
                    value={currentAddress.patronymic}
                    className={s.inputUi}
                    classNames={{
                        inputWrapper: 'shadow-none'
                    }}
                    onChange={(e) =>
                        onHandleChange({ patronymic: e.target.value })
                    }
                />
                <PhoneInput
                    country='ru'
                    placeholder='+7 (999) 999-99-99'
                    disableCountryGuess
                    value={currentAddress.number}
                    onChange={(e) => onHandleChange({ number: e })}
                    inputClass={s.phoneInput__input}
                    containerClass={s.phoneInput__container}
                />
            </div>
        </div>
    )
}

export default InputsBlock
