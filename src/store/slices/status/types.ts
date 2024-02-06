export interface Status {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export type StatusState = Readonly<{
    success: boolean
    data: Status[]
}>
