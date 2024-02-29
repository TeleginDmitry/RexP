import { useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import DeliveryDetailsPageComponent from '@/src/components/pages/DeliveryDetailsPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getCityThunk } from '@/src/store/slices/city/thunks/getDelivery'
import { clear } from '@/src/store/slices/delivery'
import { getDeliveryThunk } from '@/src/store/slices/delivery/thunks/getDelivery'
import { getDeliveryPointsThunk } from '@/src/store/slices/deliveryPoints/thunks/getDelivery'

const DeliveryDetailsPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const queryId = router.query.id as string

    const [isAccess, setAccess] = useState(false)

    useEffect(() => {
        async function queries() {
            if (queryId) {
                const deliveryOne = await dispatch(
                    getDeliveryThunk(+queryId)
                ).unwrap()
                const citiesAll = await dispatch(
                    getCityThunk(deliveryOne.city)
                ).unwrap()

                const codeCity = citiesAll.find(
                    ({ city }) => city === deliveryOne.city
                )?.code

                if (codeCity) {
                    await dispatch(getDeliveryPointsThunk(codeCity))
                }
            }

            setAccess(true)
        }

        queries()
    }, [queryId])

    useEffect(() => {
        if (!queryId) {
            dispatch(clear())
        }
    }, [queryId])

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
