import { useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import ProductPageComponent from '@/src/components/pages/ProductPageComponent'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { getOneProductThunk } from '@/src/store/slices/getOneProduct/getOneProduct/getOneProduct'

const ProductPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const id = router.query.id as string

        Promise.all([dispatch(getOneProductThunk(id))])
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
