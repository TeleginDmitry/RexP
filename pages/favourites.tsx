import { useEffect } from 'react'

import Head from 'next/head'

import FavouritesPageComponent from '@/src/components/pages/FavouritesPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getCategoriesThunk } from '@/src/store/slices/getCategory/getCategory/getCategory'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { wrapper } from '@/src/store/store'
import { login, register } from '@/src/utils/api/getToken'

const FavouritesPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { initData } = window.Telegram.WebApp

        Promise.all([
            login({ initData }),
            register({ initData }),
            dispatch(getProductsThunk({})),
            dispatch(getFavoritesThunk({})),
            dispatch(getCategoriesThunk())
        ])
    })

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <FavouritesPageComponent />
        </>
    )
}

export default FavouritesPage
