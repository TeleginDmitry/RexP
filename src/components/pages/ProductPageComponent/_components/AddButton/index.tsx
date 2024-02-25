import { Button } from '@nextui-org/react'

import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { createCart } from '@/src/utils/api/createCart'

import s from './AddButton.module.scss'

const AddButton = () => {
    const dispatch = useAppDispatch()
    const product = useAppSelector((state) => state.product.data)
    const activeFilter = useAppSelector(
        (state) => state.filters.sizes.activeFilter
    )

    const onHandleClick = async () => {
        const productSizeId = product.productSizes.find(
            ({ size }) => size.name === activeFilter
        )?.id

        if (productSizeId) {
            await createCart({ productId: product.id, productSizeId }).then(
                () => dispatch(getCartsThunk({}))
            )
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
