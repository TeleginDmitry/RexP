import { useEffect } from 'react'

import Head from 'next/head'

import DeliveryDataPageComponent from '@/src/components/pages/DeliveryDataPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getDeliveryThunk } from '@/src/store/slices/getDelivery/getDelivery/getDelivery'

const DeliveryDataPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([dispatch(getDeliveryThunk())])
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
