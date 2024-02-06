export type Favorite = {
    id: number
    userId: number
    productId: number
}

export type FavoritesState = Readonly<{
    success: boolean
    data: Favorite[]
}>
