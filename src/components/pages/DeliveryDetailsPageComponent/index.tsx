/* eslint-disable react/jsx-no-bind */
// import InputsBlock from "./_components/InputsBlock";

import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { setDeliveryData } from '@/src/store/slices/delivery'
import type { DeliveryState } from '@/src/store/slices/delivery/types'

import InputsBlock from './_components/InputsBlock'
import SaveButton from './_components/SaveButton'
import TabsBlock from './_components/TabsBlock'

import { HeaderTitle } from '../../ui/HeaderTitle/HeaderTitle'
import MainContainer from '../../ui/MainContainer'

import s from './DeliveryDetailsPageComponent.module.scss'

const DeliveryDetailsPageComponent = () => {
    const dispatch = useAppDispatch()

    const currentAddress = useAppSelector((state) => state.deliveryOne)

    const onHandleChange = (value: Partial<DeliveryState>) => {
        dispatch(setDeliveryData({ value }))
    }

    const activeTab =
        currentAddress.deliveryType.id === 1
            ? 'Пункт выдачи заказа'
            : 'Курьером'

    return (
        <MainContainer className={s.wrapper}>
            <HeaderTitle title='Данные доставки' />
            <TabsBlock
                currentAddress={currentAddress}
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
