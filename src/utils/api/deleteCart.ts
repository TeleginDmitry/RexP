import $api from '@/src/api/api'

export const deleteCart = async (id: string) => $api.delete(`/user/cart/${id}`)
