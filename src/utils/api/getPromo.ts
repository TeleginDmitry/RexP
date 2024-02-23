import $api from '@/src/api/api'

export interface PromoType {
    id: number
    value: string
    isUsed: boolean
    name: string
}

export const getPromo = async ({
    name
}: {
    name: string
}): Promise<PromoType | null> =>
    (await $api.get(`/promocode/one`, { params: { name } })).data
