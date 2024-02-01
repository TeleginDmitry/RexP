import $api from '@/src/api/api'

export interface DeliveryCreate {
    firstName: string
    lastName: string
    patronymic: string
    number: string
    city: string
    street: string
    house: string | null
    flat: string | null
    isMain: boolean
    deliveryTypeId: number
    deliveryPointAddress: string
}

export const createDeliveryCart = async (payload: DeliveryCreate) =>
    $api.post('/user/delivery/create', payload)

export const editDeliveryCart = async (
    id: number,
    payload: Partial<DeliveryCreate>
) => $api.patch(`/user/delivery/${id}`, payload)

export const deleteDeliveryCart = async (id: number | string) =>
    $api.delete(`/user/delivery/${id}`)
