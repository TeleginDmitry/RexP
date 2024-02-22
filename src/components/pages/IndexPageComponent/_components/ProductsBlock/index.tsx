/* eslint-disable @typescript-eslint/no-shadow */
import { useRef } from 'react'

import CatalogSpacer from '@/src/components/ui/CatalogSpacer'
import ProductCard from '@/src/components/ui/ProductCard'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { useObserver } from '@/src/hooks/useObserver'
import { usePagination } from '@/src/hooks/usePagination'
import { addPaginatedProducts } from '@/src/store/slices/getProducts'
import { getProducts } from '@/src/utils/api/getProducts'

import NotFound from '../NotFound/NotFound'

const ProductsBlock = () => {
    const dispatch = useAppDispatch()

    const observerRef = useRef<HTMLDivElement | null>(null)
    const products = useAppSelector((state) => state.products.data)
    const filters = useAppSelector((state) => state.filter)
    const { limit, page, totalItems } = useAppSelector(
        (state) => state.pagination
    )

    const { fetchQuery } = usePagination({
        callback: async () => {
            const response = await getProducts({
                filters: { page, limit, ...filters }
            })
            if (response.data) {
                dispatch(addPaginatedProducts(response.data))
            }
            return response
        },
        limit,
        page: page + 1,
        isDisabled: totalItems === null || limit * page >= totalItems
    })

    useObserver({
        callback: fetchQuery,
        element: observerRef
    })

    if (filters.name && products.length === 0) {
        return <NotFound />
    }

    return (
        <CatalogSpacer>
            {products.map(
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
            <div ref={observerRef} />
        </CatalogSpacer>
    )
}

export default ProductsBlock
