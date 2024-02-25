import { useEffect } from 'react'

import Head from 'next/head'

import DeliveryPageComponent from '@/src/components/pages/DeliveryPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getBrandsThunk } from '@/src/store/slices/getBrands/getBrands/getBrands'
import { getColorsThunk } from '@/src/store/slices/getColors/getColors/getColors'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'
import { getStatusThunk } from '@/src/store/slices/status/getStatus/getStatus'

const DeliveryPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([
            dispatch(getStatusThunk()),
            dispatch(getColorsThunk()),
            dispatch(getSizesThunk()),
            dispatch(getBrandsThunk())
        ])
    }, [])

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
