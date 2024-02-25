import { useEffect } from 'react'

import Head from 'next/head'

import ProfilePageComponent from '@/src/components/pages/ProfilePageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { getViewedThunk } from '@/src/store/slices/getViewed/getViewed/getViewed'

const ProfilePage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([
            dispatch(getProductsThunk({})),
            dispatch(getViewedThunk())
        ])
    }, [])

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
