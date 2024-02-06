import { Button } from '@nextui-org/react'
import { toast } from 'sonner'

import { MAX_PRODUCTS_IN_BASKET } from '@/src/constants'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { increaseCarts } from '@/src/store/slices/getCarts'
import { createCart } from '@/src/utils/api/createCart'

import s from './AddButton.module.scss'

const AddButton = () => {
    const dispatch = useAppDispatch()
    const product = useAppSelector((state) => state.product.data)
    const carts = useAppSelector((state) => state.carts.data)
    const activeFilter = useAppSelector(
        (state) => state.filters.sizes.activeFilter
    )

    const onHandleClick = async () => {
        if (carts.length >= MAX_PRODUCTS_IN_BASKET) {
            toast.error(
                `Максимальное количество позиций в корзине - ${MAX_PRODUCTS_IN_BASKET}`
            )
            return
        }

        const productSizeId = product.productSizes.find(
            ({ size }) => size.name === activeFilter
        )?.id

        if (productSizeId) {
            await createCart({ productId: product.id, productSizeId })
                .then(() => dispatch(increaseCarts()))
                .catch(({ response: { data } }) => {})
        }
    }

    return (
        <div className={s.wrapper}>
            <Button className={s.button} onClick={onHandleClick}>
                Добавить в корзину
            </Button>
        </div>
    )
}

export default AddButton
