import type { Product } from '../getProducts/types'

export type Favorite = {
    id: number
    userId: number
    productId: number
    product: Product
    price: number
}

export type FavoritesState = Readonly<{
    success: boolean
    data: Favorite[]
}>
