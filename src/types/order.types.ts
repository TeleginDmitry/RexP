import type { Delivery } from './delivery.types'

import type { Product } from '../store/slices/getProducts/types'

export interface Order {
    id: number
    totalPrice: number
    trackNumber: string
    shippingDate: string
    isReviwed: boolean
    orderStatus: DeliveryTypeOrImagesEntityOrBrandOrOrderStatus
    delivery: Delivery
    orderContents?: OrderContentsEntity[] | null
    createdAt: string
    updatedAt: string
}
export interface DeliveryTypeOrImagesEntityOrBrandOrOrderStatus {
    id: number
    name: string
}

export interface OrderContentsEntity {
    id: number
    count: number
    sizeId: number
    userId: number
    product: Product
    productSize: ProductSize
}

export interface ProductSize {
    id: number
    price: number
    amount: number
    size: Size
}
export interface Size {
    id: number
    name: string
}
