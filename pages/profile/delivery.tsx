import { useEffect } from 'react'

import Head from 'next/head'

import DeliveryPageComponent from '@/src/components/pages/DeliveryPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getOrdersThunk } from '@/src/store/slices/orders/thunks'
import { getStatusThunk } from '@/src/store/slices/status/getStatus/getStatus'
import { wrapper } from '@/src/store/store'
import { login, register } from '@/src/utils/api/getToken'

const DeliveryPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { initData } = window.Telegram.WebApp

        Promise.all([
            login({ initData }),
            register({ initData }),
            dispatch(getOrdersThunk({})),
            dispatch(getStatusThunk())
        ])
    })

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <DeliveryPageComponent />
        </>
    )
}

export default DeliveryPage
