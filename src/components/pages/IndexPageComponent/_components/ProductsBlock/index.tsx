/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useRef } from 'react'

import CatalogSpacer from '@/src/components/ui/CatalogSpacer'
import ProductCard from '@/src/components/ui/ProductCard'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { useObserver } from '@/src/hooks/useObserver'
import { usePagination } from '@/src/hooks/usePagination'
import { getPaginatedProductsThunk } from '@/src/store/slices/getProducts/getProducts/getProducts'
import { setPagination } from '@/src/store/slices/pagination'

import NotFound from '../NotFound/NotFound'

const ProductsBlock = () => {
    const dispatch = useAppDispatch()

    const observerRef = useRef<HTMLDivElement | null>(null)
    const products = useAppSelector((state) => state.products)
    const filters = useAppSelector((state) => state.filter)
    const { limit, page, nextPage } = useAppSelector(
        (state) => state.pagination
    )
    console.log(page)
    const callbackFn = useCallback(async () => {
        const result = await dispatch(
            getPaginatedProductsThunk({
                filters: { ...filters, limit, page }
            })
        ).unwrap()

        dispatch(
            setPagination({
                nextPage: result.nextPage,
                totalItems: result.totalItems,
                totalPages: result.totalPages,
                page: page + 1
            })
        )

        return result
    }, [dispatch, filters, limit, page])

    const { fetchQuery } = usePagination({
        callback: callbackFn,
        limit,
        page,
        isDisabled: !nextPage
    })

    useObserver({
        callback: fetchQuery,
        element: observerRef,
        isLoading: products.isLoading,
        condition: !!nextPage
    })

    if (filters.name && products.data.length === 0) {
        return <NotFound />
    }

    return (
        <CatalogSpacer>
            {products.data.map(
                ({ id, name, images, price, isOuter, discount }, index) => (
                    <ProductCard
                        key={id}
                        isOuter={isOuter}
                        price={price * ((100 - discount) / 100)}
                        name={name}
                        imgUrl={images[0].name}
                        imagePriority={index < 4}
                        id={id}
                    />
                )
            )}
            <div className='absolute bottom-16' ref={observerRef} />
        </CatalogSpacer>
    )
}

export default ProductsBlock
