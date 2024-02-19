import { useEffect } from 'react'

import Head from 'next/head'

import FavouritesPageComponent from '@/src/components/pages/FavouritesPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'

const FavouritesPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([dispatch(getFavoritesThunk({}))])
    }, [])

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
