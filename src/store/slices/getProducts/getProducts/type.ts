import type { ResponsePaginatedData } from '@/src/types/pagination.types'

import type { Product } from '../types'

export interface GetProductsResponseType extends ResponsePaginatedData {
    results: Product[]
}
