import { useEffect } from 'react'

import Head from 'next/head'

import BasketPageComponent from '@/src/components/pages/BasketPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { resetFilters } from '@/src/store/slices/filter'
import { getBrandsThunk } from '@/src/store/slices/getBrands/getBrands/getBrands'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { getCategoriesThunk } from '@/src/store/slices/getCategory/getCategory/getCategory'
import { getColorsThunk } from '@/src/store/slices/getColors/getColors/getColors'
import { getDeliveryThunk } from '@/src/store/slices/getDelivery/getDelivery/getDelivery'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'
import { resetPagination } from '@/src/store/slices/pagination'

const BasketPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([
            dispatch(getCategoriesThunk()),
            dispatch(getDeliveryThunk()),
            dispatch(getFavoritesThunk({})),
            dispatch(getColorsThunk()),
            dispatch(getSizesThunk()),
            dispatch(getBrandsThunk()),
            dispatch(resetFilters()),
            dispatch(resetPagination()),
            dispatch(getCartsThunk({}))
        ])
    }, [])
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
