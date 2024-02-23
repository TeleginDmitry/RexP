export interface Delivery {
    street: string
    id: number
    firstName: string
    lastName: string
    patronymic: string
    number: string
    city: string
    address: string
    isMain: boolean
    deliveryType: DeliveryType
    userId: number
    createdAt: string
    updatedAt: string
    house: string | null
    flat: string | null
    deliveryPointAddress: string
}
export interface DeliveryType {
    id: number
    name: string
}
