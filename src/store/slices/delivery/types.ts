import type { Delivery } from '@/src/types/delivery.types'

export type DeliveryState = Omit<
    Delivery,
    'createdAt' | 'id' | 'updatedAt' | 'userId'
>
