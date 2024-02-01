import $api from '@/src/api/api'
import type { GetProductsResponseType } from '@/src/store/slices/getProducts/getProducts/type'
import type { PayloadFilter } from '@/src/store/slices/getProducts/types'

export const getProducts = ({ filters }: PayloadFilter) =>
    $api.post<GetProductsResponseType>(`/product/all`, filters)
