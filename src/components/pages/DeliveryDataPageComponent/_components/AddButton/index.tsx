import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

import { MAX_ADDRESSES } from '@/src/constants'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import s from './AddButton.module.scss'

const AddButton = () => {
    const deliveryCarts = useAppSelector((state) => state.delivery.data)
    const router = useRouter()

    const onHandleClick = () => {
        if (deliveryCarts.length >= MAX_ADDRESSES) {
            toast.error(`Максимальное количество адресов: ${MAX_ADDRESSES}`)
        } else {
            router.push({ pathname: '/profile/deliveryDetails' })
        }
    }

    return (
        <Button
            className={clsx(
                s.button,
                deliveryCarts.length >= MAX_ADDRESSES && s.disabled,
                deliveryCarts.length === 0 && s.initial
            )}
            onClick={onHandleClick}
        >
            Добавить данные доставки
        </Button>
    )
}

export default AddButton
