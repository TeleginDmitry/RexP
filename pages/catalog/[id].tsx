import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import ProductPageComponent from '@/src/components/pages/ProductPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getBrandsThunk } from '@/src/store/slices/getBrands/getBrands/getBrands'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { getColorsThunk } from '@/src/store/slices/getColors/getColors/getColors'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { getOneProductThunk } from '@/src/store/slices/getOneProduct/getOneProduct/getOneProduct'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'
import { getOrdersThunk } from '@/src/store/slices/orders/thunks'
import { wrapper } from '@/src/store/store'
import { login, register } from '@/src/utils/api/getToken'

const ProductPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const { initData } = window.Telegram.WebApp
        const id = router.query.id as string

        Promise.all([
            login({ initData }),
            register({ initData }),
            dispatch(getOneProductThunk(id)),
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
            <ProductPageComponent />
        </>
    )
}

export default ProductPage
