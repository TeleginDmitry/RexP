import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import DeliveryDetailsPageComponent from '@/src/components/pages/DeliveryDetailsPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getCityThunk } from '@/src/store/slices/city/thunks/getDelivery'
import { getDeliveryThunk } from '@/src/store/slices/delivery/thunks/getDelivery'
import { wrapper } from '@/src/store/store'
import { login, register } from '@/src/utils/api/getToken'

const DeliveryDetailsPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const { initData } = window.Telegram.WebApp
        const id = router.query.id as string

        Promise.all([
            login({ initData }),
            register({ initData }),
            dispatch(getDeliveryThunk(+id))
        ])
    })

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <DeliveryDetailsPageComponent />
        </>
    )
}

export default DeliveryDetailsPage
