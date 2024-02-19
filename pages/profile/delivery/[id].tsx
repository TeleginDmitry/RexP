import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import OrderPageComponent from '@/src/components/pages/OrderPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { getOrderThunk } from '@/src/store/slices/order/thunks'
import { getOrdersThunk } from '@/src/store/slices/orders/thunks'

const OrderPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const id = router.query.id as string

        Promise.all([
            dispatch(getOrderThunk({ id: +id })),
            dispatch(getCartsThunk({})),
            dispatch(getOrdersThunk({}))
        ])
    }, [])

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <OrderPageComponent />
        </>
    )
}

export default OrderPage
