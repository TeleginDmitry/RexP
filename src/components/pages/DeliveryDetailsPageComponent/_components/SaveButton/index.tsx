import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

import type { DeliveryCreate } from '@/src/utils/api/DeliveryCartMethods'
import {
    createDeliveryCart,
    editDeliveryCart
} from '@/src/utils/api/DeliveryCartMethods'

import s from './SaveButton.module.scss'

interface Props {
    currentAddress: DeliveryCreate
}

const SaveButton = ({ currentAddress }: Props) => {
    const router = useRouter()

    const id = router.query.id as string
    const onHandleClick = async () => {
        if (id) {
            const result = await editDeliveryCart(+id, currentAddress)

            if (result.data) {
                router.back()
            }

            return
        }

        try {
            const result = await createDeliveryCart(currentAddress)

            if (result.data) {
                router.back()
            }
        } catch (error) {
            /* empty */
        }
    }

    return (
        <Button className={s.button} onClick={onHandleClick}>
            Сохранить данные доставки
        </Button>
    )
}

export default SaveButton
