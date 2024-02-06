export type CategoryType = {
    id: number
    name: string
    subCategories: Array<{
        id: number
        name: string
    }>
    createdAt: string
    updatedAt: string
}

export type CategoryState = Readonly<{
    success: boolean
    data: CategoryType[]
}>
