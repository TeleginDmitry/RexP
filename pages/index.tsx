import { useEffect } from 'react'

import Head from 'next/head'

import IndexPageComponent from '@/src/components/pages/IndexPageComponent'
import { LIMIT, PAGE } from '@/src/constants'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getBrandsThunk } from '@/src/store/slices/getBrands/getBrands/getBrands'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { getCategoriesThunk } from '@/src/store/slices/getCategory/getCategory/getCategory'
import { getColorsThunk } from '@/src/store/slices/getColors/getColors/getColors'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'
import { getOrdersThunk } from '@/src/store/slices/orders/thunks'
import { wrapper } from '@/src/store/store'
import { login, register } from '@/src/utils/api/getToken'

const IndexPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { initData } = window.Telegram.WebApp

        Promise.all([
            login({ initData }),
            register({ initData }),
            dispatch(
                getProductsThunk({ filters: { limit: LIMIT, page: PAGE } })
            ),
            dispatch(getCategoriesThunk()),
            dispatch(getFavoritesThunk({})),
            dispatch(getCartsThunk({})),
            dispatch(getColorsThunk()),
            dispatch(getSizesThunk()),
            dispatch(getBrandsThunk()),
            dispatch(getOrdersThunk({}))
        ])
    }, [])

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <IndexPageComponent />
        </>
    )
}

export default IndexPage
