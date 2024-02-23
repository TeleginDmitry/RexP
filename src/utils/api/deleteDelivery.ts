import $api from '@/src/api/api'

export type DeleteDeliveryType = {
    deliveryId: number
}

export const deleteDelivery = async (payload: DeleteDeliveryType) =>
    $api.delete(`/user/delivery/${payload.deliveryId}`)
