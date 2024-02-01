export interface Delivery {
    street: string | null
    id: number | null
    firstName: string | null
    lastName: string | null
    patronymic: string | null
    number: string | null
    city: string | null
    address: string | null
    isMain: boolean | null
    deliveryType: DeliveryType | null
    userId: number | null
    createdAt: string | null
    updatedAt: string | null
    house: string | null
    flat: string | null
    pvzAddress: string | null
    deliveryPointAddress: string | null
}
export interface DeliveryType {
    id: number
    name: string
}
