import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import DeliveryDetailsPageComponent from '@/src/components/pages/DeliveryDetailsPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getCityThunk } from '@/src/store/slices/city/thunks/getDelivery'
import { clear } from '@/src/store/slices/delivery'
import { getDeliveryThunk } from '@/src/store/slices/delivery/thunks/getDelivery'
import { getDeliveryThunk as getDeliveryAllThunk } from '@/src/store/slices/getDelivery/getDelivery/getDelivery'

const DeliveryDetailsPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const id = router.query.id as string

        if (!id) {
            dispatch(clear())
        }

        Promise.all([
            dispatch(getCityThunk()),
            dispatch(getDeliveryAllThunk()),
            !!id && dispatch(getDeliveryThunk(+id))
        ])
    }, [])

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
