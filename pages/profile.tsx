import { useEffect } from 'react'

import Head from 'next/head'

import ProfilePageComponent from '@/src/components/pages/ProfilePageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { getViewedThunk } from '@/src/store/slices/getViewed/getViewed/getViewed'
import { wrapper } from '@/src/store/store'
import { login, register } from '@/src/utils/api/getToken'

const ProfilePage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { initData } = window.Telegram.WebApp

        Promise.all([
            login({ initData }),
            register({ initData }),
            dispatch(getProductsThunk({})),
            dispatch(getViewedThunk()),
            dispatch(getFavoritesThunk({}))
        ])
    })

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <ProfilePageComponent />
        </>
    )
}

export default ProfilePage
