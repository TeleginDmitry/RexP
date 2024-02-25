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

const DeliveryDetailsPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const queryId = router.query.id as string

    const currentAddress = useAppSelector((state) => state.deliveryOne)

    const [isAccess, setAccess] = useState(false)

    useEffect(() => {
        async function queries() {
            if (!queryId) {
                dispatch(clear())
            }

            if (queryId) {
                const deliveryOne = await dispatch(
                    getDeliveryThunk(+queryId)
                ).unwrap()
                const citiesAll = await dispatch(
                    getCityThunk(deliveryOne.city)
                ).unwrap()

                const codeCity = citiesAll.find(
                    ({ city }) => city === currentAddress.city
                )?.code

                if (codeCity) {
                    await dispatch(getDeliveryPointsThunk(codeCity))
                }
            }

            setAccess(true)
        }

        queries()
    }, [currentAddress.city, dispatch, queryId])

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
