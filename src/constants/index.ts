export const IS_DEV = true

export const MAX_FAVOURITES_PRODUCTS = 4
export const MAX_FAVOURITES_LS_KEY = 'favourites'

export const MAX_PRODUCTS_IN_HISTORY = 30
export const PRODUCTS_IN_HISTORY_LS_KEY = 'history'

export const MAX_PRODUCTS_IN_BASKET = 100
export const PRODUCTS_IN_BASKET_LS_KEY = 'basket'

export const MAX_ADDRESSES = 5
export const ADDRESSES_LS_KEY = 'addresses'

export const ACTIVE_ADDRESSES_LS_KEY = 'active-address'

export const DELIVERY_TYPES = {
    PICK: 'Пункт выдачи заказа',
    COURIER: 'Курьером'
} as const

export type DeliveryType = (typeof DELIVERY_TYPES)[keyof typeof DELIVERY_TYPES]

export const MAX_PRICE = 3599999
export const MIN_PRICE = 99

export const LIMIT = 20
export const PAGE = 1
