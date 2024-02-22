/* eslint-disable react/jsx-no-bind */
// import InputsBlock from "./_components/InputsBlock";
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'
import type { DeliveryCreate } from '@/src/utils/api/DeliveryCartMethods'

import InputsBlock from './_components/InputsBlock'
import SaveButton from './_components/SaveButton'
import TabsBlock from './_components/TabsBlock'

import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle'
import MainContainer from '../../ui/MainContainer'

import s from './DeliveryDetailsPageComponent.module.scss'

const DeliveryDetailsPageComponent = () => {
    const router = useRouter()
    const queryId = router.query.id as string

    const {
        deliveryType,
        id,
        createdAt,
        updatedAt,
        userId,
        isMain,
        ...initialAddres
    } = useAppSelector((state) => state.deliveryOne)
    const delivery = useAppSelector((state) => state.delivery.data)
    const [currentAddress, setCurrentAddress] = useState<DeliveryCreate>({
        ...initialAddres,
        isMain: queryId ? isMain : !delivery.length,
        deliveryTypeId: deliveryType.id
    })
    console.log(currentAddress)

    const onHandleChange = (value: Partial<DeliveryCreate>) => {
        setCurrentAddress((state) => ({
            ...state,
            ...value
        }))
    }

    const activeTab =
        currentAddress.deliveryTypeId === 1 ? 'Пункт выдачи заказа' : 'Курьером'

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
