export type Product = {
    id: number
    name: string
    discount: number
    isOuter: boolean
    gender: string
    price: number
    productSizes: Array<{
        id: number
        price: number
        size: {
            id: number
            name: string
        }
    }>
    subcategories: {
        id: number
        name: string
    }
    brand: {
        id: number
        name: string
    }
    color: {
        id: number
        name: string
        colorID: string
    }
    images: Array<{
        id: number
        name: string
    }>
    createdAt: string
    updatedAt: string
}

export type ProductsState = Readonly<{
    success: boolean
    data: Product[]
    isLoading: boolean
}>

export type Filters = {
    name?: string
    gender?: string
    maxPrice: number
    minPrice: number
    sizes: string[]
    subcategories?: number[] | string[]
    brands: string[]
    colors: string[]
    orderBy?: string
    sortBy?: string
    limit?: number
    page?: number
    categoryId?: number
}

export type PayloadFilter = {
    filters?: Partial<Filters>
}
