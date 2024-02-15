import $api from '@/src/api/api'

export type CreateOrderType = {
    deliveryId: number
    products: number[]
}

export const createOrder = async (payload: CreateOrderType) =>
    $api.post('/user/order/create', payload)
