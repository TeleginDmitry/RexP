import $api from '@/src/api/api'

export interface TariffType {
    totalSum: number
}

export const getTariff = async ({
    products
}: {
    products: number[] | string[]
}): Promise<TariffType> =>
    (
        await $api.get(`/user/delivery/calculator/tariff`, {
            params: { products }
        })
    ).data
