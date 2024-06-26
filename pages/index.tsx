import { useEffect } from 'react'

import Head from 'next/head'

import IndexPageComponent from '@/src/components/pages/IndexPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getBrandsThunk } from '@/src/store/slices/getBrands/getBrands/getBrands'
import { getCategoriesThunk } from '@/src/store/slices/getCategory/getCategory/getCategory'
import { getColorsThunk } from '@/src/store/slices/getColors/getColors/getColors'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'

const IndexPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([
            dispatch(getCategoriesThunk()),
            dispatch(getFavoritesThunk({})),
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
            <IndexPageComponent />
        </>
    )
}

export default IndexPage
