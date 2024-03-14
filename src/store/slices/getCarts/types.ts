import type { Product } from '../getProducts/types'

export interface Cart {
    id: number
    count: number
    userId: number
    productSizeId: number
    product: Product
    createdAt: string
    productSize: {
        id: number
        price: number
        amount: number
        size: CategoryOrSize
    }
}

export interface SubCategory {
    id: number
    name: string
    categoryId: number
    category: CategoryOrSize
}
export interface CategoryOrSize {
    name: string
}

export type CartsState = {
    success: boolean
    isLoading: boolean
    totalItems: number | null
    data: Cart[]
}
