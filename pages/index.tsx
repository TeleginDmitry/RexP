import { useEffect } from 'react'

import Head from 'next/head'

import IndexPageComponent from '@/src/components/pages/IndexPageComponent'
import { LIMIT, PAGE } from '@/src/constants'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getCategoriesThunk } from '@/src/store/slices/getCategory/getCategory/getCategory'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
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
            dispatch(getFavoritesThunk({}))
        ])
    })

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
