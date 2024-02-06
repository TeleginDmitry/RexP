import $api from '@/src/api/api'

export const deleteFavorite = async (productId: number) =>
    $api.delete(`/favorite/${productId}`)
