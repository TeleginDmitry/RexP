import type { AxiosResponse } from 'axios'

import $api from '@/src/api/api'

export type CreateOrderType = {
    deliveryId: number
    products: number[]
}

export interface CreateOrderResponse {
    confirmationURL: string
}

export const createOrder = async (
    payload: CreateOrderType
): Promise<AxiosResponse<CreateOrderResponse>> =>
    $api.post('/user/order/create', payload)
