import $api from '@/src/api/api'

export const getPromo = ({ name }: { name: string }) =>
    $api.get(`/promocode/one`, { params: { name } })
