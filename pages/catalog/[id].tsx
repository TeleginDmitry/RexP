import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import ProductPageComponent from '@/src/components/pages/ProductPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { getOneProductThunk } from '@/src/store/slices/getOneProduct/getOneProduct/getOneProduct'
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
            dispatch(getFavoritesThunk({}))
        ])
    })

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
