import $api from '@/src/api/api'
import type { City } from '@/src/types/city'

export const getProducts = ({ name }: { name: string }) =>
    $api.post<City[]>(`/location/city`, { params: { name } })
