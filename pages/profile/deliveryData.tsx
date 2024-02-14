import { useEffect } from 'react'

import Head from 'next/head'

import DeliveryDataPageComponent from '@/src/components/pages/DeliveryDataPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getBrandsThunk } from '@/src/store/slices/getBrands/getBrands/getBrands'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { getColorsThunk } from '@/src/store/slices/getColors/getColors/getColors'
import { getDeliveryThunk } from '@/src/store/slices/getDelivery/getDelivery/getDelivery'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'
import { getOrdersThunk } from '@/src/store/slices/orders/thunks'
import { wrapper } from '@/src/store/store'
import { login, register } from '@/src/utils/api/getToken'

const DeliveryDataPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { initData } = window.Telegram.WebApp

        Promise.all([
            login({ initData }),
            register({ initData }),
            dispatch(getDeliveryThunk()),
            dispatch(getCartsThunk({})),
            dispatch(getColorsThunk()),
            dispatch(getSizesThunk()),
            dispatch(getBrandsThunk()),
            dispatch(getOrdersThunk({}))
        ])
    }, [])

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <DeliveryDataPageComponent />
        </>
    )
}

export default DeliveryDataPage
