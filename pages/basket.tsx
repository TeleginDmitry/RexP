import { useEffect } from 'react'

import Head from 'next/head'

import BasketPageComponent from '@/src/components/pages/BasketPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { getCategoriesThunk } from '@/src/store/slices/getCategory/getCategory/getCategory'
import { getDeliveryThunk } from '@/src/store/slices/getDelivery/getDelivery/getDelivery'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { wrapper } from '@/src/store/store'
import { login, register } from '@/src/utils/api/getToken'

const BasketPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { initData } = window.Telegram.WebApp

        Promise.all([
            login({ initData }),
            register({ initData }),
            dispatch(getCartsThunk({})),
            dispatch(getCategoriesThunk()),
            dispatch(getDeliveryThunk()),
            dispatch(getFavoritesThunk({}))
        ])
    })
    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <BasketPageComponent />
        </>
    )
}

export default BasketPage
