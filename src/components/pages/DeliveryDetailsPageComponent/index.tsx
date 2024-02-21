/* eslint-disable react/jsx-no-bind */
// import InputsBlock from "./_components/InputsBlock";
import { useState } from 'react'

import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'
import type { DeliveryCreate } from '@/src/utils/api/DeliveryCartMethods'

import InputsBlock from './_components/InputsBlock'
import SaveButton from './_components/SaveButton'
import TabsBlock from './_components/TabsBlock'

import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle'
import MainContainer from '../../ui/MainContainer'

import s from './DeliveryDetailsPageComponent.module.scss'

const DeliveryDetailsPageComponent = () => {
    const { deliveryType, id, createdAt, updatedAt, userId, ...initialAddres } =
        useAppSelector((state) => state.deliveryOne)
    const delivery = useAppSelector((state) => state.delivery.data)
    const [currentAddress, setCurrentAddress] = useState<DeliveryCreate>({
        ...initialAddres,
        isMain: !delivery.length,
        deliveryTypeId: deliveryType.id
    })
    const onHandleChange = (
        value: number | string,
        name: keyof DeliveryCreate
    ) => {
        console.log(value)
        setCurrentAddress((state) => ({
            ...state,
            [name]: value
        }))
    }

    const activeTab =
        currentAddress.deliveryTypeId === 1 ? 'Пункт выдачи заказа' : 'Курьером'

    return (
        <MainContainer className={s.wrapper}>
            <HeaderTitle title='Данные доставки' />
            <TabsBlock
                deliveryTypeId={deliveryType.id}
                onHandleChange={onHandleChange}
                activeTab={activeTab}
            />
            <InputsBlock
                currentAddress={currentAddress}
                onHandleChange={onHandleChange}
                activeTab={activeTab}
            />
            <SaveButton currentAddress={currentAddress} />
        </MainContainer>
    )
}

export default DeliveryDetailsPageComponent
