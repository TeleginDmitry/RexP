import { useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import DeliveryDetailsPageComponent from '@/src/components/pages/DeliveryDetailsPageComponent'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getCityThunk } from '@/src/store/slices/city/thunks/getDelivery'
import { clear } from '@/src/store/slices/delivery'
import { getDeliveryThunk } from '@/src/store/slices/delivery/thunks/getDelivery'
import { getDeliveryPointsThunk } from '@/src/store/slices/deliveryPoints/thunks/getDelivery'
import { getDeliveryThunk as getDeliveryAllThunk } from '@/src/store/slices/getDelivery/getDelivery/getDelivery'

const DeliveryDetailsPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const currentAddress = useAppSelector((state) => state.deliveryOne)
    const cities = useAppSelector((state) => state.city)

    const [isAccess, setAccess] = useState(false)

    const codeCity = cities.find(
        ({ city }) => city === currentAddress.city
    )?.code

    useEffect(() => {
        if (codeCity) {
            dispatch(getDeliveryPointsThunk(codeCity))
        }
        setAccess(true)
    }, [codeCity, dispatch])

    async function queries() {
        const id = router.query.id as string

        if (!id) {
            dispatch(clear())
        }

        await Promise.all([
            dispatch(getCityThunk()),
            dispatch(getDeliveryAllThunk()),
            !!id && dispatch(getDeliveryThunk(+id))
        ])
    }

    useEffect(() => {
        queries()
    }, [])

    if (!isAccess) {
        return null
    }

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
