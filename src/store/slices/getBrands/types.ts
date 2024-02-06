export type BrandType = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export type BrandsState = Readonly<{
    success: boolean
    data: BrandType[]
}>
