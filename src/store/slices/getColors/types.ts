export type ColorType = {
    id: number
    name: string
    colorID: string
    createdAt: string
    updatedAt: string
}

export type ColorsState = Readonly<{
    success: boolean
    data: ColorType[]
}>
