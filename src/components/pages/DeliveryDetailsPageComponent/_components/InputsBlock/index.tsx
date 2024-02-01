/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react'
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/material.css'

import { useRouter } from 'next/router'

import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getCityThunk } from '@/src/store/slices/city/thunks/getDelivery'
import { getDeliveryPointsThunk } from '@/src/store/slices/deliveryPoints/thunks/getDelivery'
import type { DeliveryCreate } from '@/src/utils/api/DeliveryCartMethods'

import s from './InputsBlock.module.scss'

interface Props {
    currentAddress: DeliveryCreate
    onHandleChange: (value: string, name: keyof DeliveryCreate) => void
    activeTab: 'Курьером' | 'Пункт выдачи заказа'
}

const InputsBlock = ({ currentAddress, onHandleChange, activeTab }: Props) => {
    const dispatch = useAppDispatch()

    const router = useRouter()

    const cities = useAppSelector((state) => state.city)
    const deliveryPoints = useAppSelector((state) => state.deliveryPoints)

    const idParam = router.pathname.includes('id')

    const defaultPvzAdress = idParam
        ? deliveryPoints.find(({ city }) =>
              city
                  .toLowerCase()
                  .includes(currentAddress.city.toLowerCase() ?? '')
          )
        : undefined

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
                    onValueChange={(value) => {
                        dispatch(getCityThunk(value))
                    }}
                    defaultItems={cities}
                    defaultSelectedKey={currentAddress.city || undefined}
                >
                    {({ city, code }) => (
                        <AutocompleteItem
                            onClick={() => {
                                onHandleChange(city, 'city')
                                dispatch(getDeliveryPointsThunk(code))
                            }}
                            key={code}
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
                        defaultItems={deliveryPoints}
                        defaultSelectedKey={defaultPvzAdress?.address}
                    >
                        {({ address, address_full }) => (
                            <AutocompleteItem
                                onClick={() => {
                                    onHandleChange(
                                        address_full,
                                        'deliveryPointAddress'
                                    )
                                }}
                                key={address}
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
                            value={currentAddress.street ?? ''}
                            className={s.inputUi}
                            classNames={{
                                inputWrapper: 'shadow-none'
                            }}
                            onChange={(e) =>
                                onHandleChange(e.target.value, 'street')
                            }
                        />
                        <div className={s.inputs_row}>
                            <Input
                                type='text'
                                label='Дом'
                                className={s.inputUi}
                                classNames={{
                                    inputWrapper: 'shadow-none'
                                }}
                                onChange={(e) =>
                                    onHandleChange(e.target.value, 'house')
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
                                    onHandleChange(e.target.value, 'flat')
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
                    value={currentAddress.lastName ?? ''}
                    className={s.inputUi}
                    classNames={{
                        inputWrapper: 'shadow-none'
                    }}
                    onChange={(e) => onHandleChange(e.target.value, 'lastName')}
                />
                <Input
                    type='text'
                    label='Имя'
                    value={currentAddress.firstName ?? ''}
                    className={s.inputUi}
                    classNames={{
                        inputWrapper: 'shadow-none'
                    }}
                    onChange={(e) =>
                        onHandleChange(e.target.value, 'firstName')
                    }
                />
                <Input
                    type='text'
                    label='Отчество'
                    value={currentAddress.patronymic ?? ''}
                    className={s.inputUi}
                    classNames={{
                        inputWrapper: 'shadow-none'
                    }}
                    onChange={(e) =>
                        onHandleChange(e.target.value, 'patronymic')
                    }
                />
                <PhoneInput
                    country='ru'
                    placeholder='+7 (999) 999-99-99'
                    disableCountryGuess
                    value={currentAddress.number ?? ''}
                    onChange={(e) => onHandleChange(e, 'number')}
                    inputClass={s.phoneInput__input}
                    containerClass={s.phoneInput__container}
                />
            </div>
        </div>
    )
}

export default InputsBlock
