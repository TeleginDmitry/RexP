import type { Product } from '../getProducts/types'

export type OneProductsState = Readonly<{
    success: boolean
    data: Product
}>
