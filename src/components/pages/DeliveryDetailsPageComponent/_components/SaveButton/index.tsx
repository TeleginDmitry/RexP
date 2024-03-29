import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'

import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'
import type { DeliveryState } from '@/src/store/slices/delivery/types'
import {
    createDeliveryCart,
    editDeliveryCart
} from '@/src/utils/api/DeliveryCartMethods'

import s from './SaveButton.module.scss'

interface Props {
    currentAddress: DeliveryState
}

const SaveButton = ({ currentAddress }: Props) => {
    const router = useRouter()
    const queryId = router.query.id as string
    const delivery = useAppSelector((state) => state.delivery.data)

    const id = router.query.id as string
    const onHandleClick = async () => {
        try {
            if (id) {
                const { deliveryPointAddress, ...otherValues } = currentAddress
                const values =
                    currentAddress.deliveryType.id === 2
                        ? otherValues
                        : currentAddress
                const result = await editDeliveryCart(+id, {
                    ...values,
                    deliveryTypeId: currentAddress.deliveryType.id
                })

                if (result.data) {
                    router.back()
                }

                return
            }

            const data = {
                ...currentAddress,
                isMain: queryId ? currentAddress.isMain : !delivery.length,
                deliveryTypeId: currentAddress.deliveryType.id
            }
            const result = await createDeliveryCart(data)

            if (result.data) {
                router.back()
            }
        } catch (error) {
            /* empty */
        }
    }
    const isDisabled =
        currentAddress.deliveryType.id === 1
            ? !currentAddress.patronymic ||
              !currentAddress.number ||
              !currentAddress.lastName ||
              !currentAddress.firstName ||
              !currentAddress.city ||
              !currentAddress.deliveryPointAddress
            : !currentAddress.patronymic ||
              !currentAddress.number ||
              !currentAddress.lastName ||
              !currentAddress.firstName ||
              !currentAddress.deliveryType.id ||
              !currentAddress.city ||
              !currentAddress.flat ||
              !currentAddress.house ||
              !currentAddress.street
    return (
        <Button
            isDisabled={isDisabled}
            className={s.button}
            onClick={onHandleClick}
        >
            Сохранить данные доставки
        </Button>
    )
}

export default SaveButton
