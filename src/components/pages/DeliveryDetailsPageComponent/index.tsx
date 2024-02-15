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
    const { deliveryType, ...initialAddres } = useAppSelector(
        (state) => state.deliveryOne
    )
    const [currentAddress, setCurrentAddress] = useState<DeliveryCreate>({
        ...initialAddres,
        deliveryTypeId: deliveryType.id
    })

    const onHandleChange = (
        value: number | string,
        name: keyof DeliveryCreate
    ) => {
        setCurrentAddress((state) => ({
            ...state,
            [name]: value
        }))
    }

    const activeTab =
        currentAddress.deliveryTypeId === 2 ? 'Курьером' : 'Пункт выдачи заказа'

    return (
        <MainContainer className={s.wrapper}>
            <HeaderTitle title='Данные доставки' />
            <TabsBlock onHandleChange={onHandleChange} activeTab={activeTab} />
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
