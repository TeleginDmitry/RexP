/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */

import Cookies from 'js-cookie'

import $api from '@/src/api/api'

interface Token {
    token: string
}

interface Props {
    initData: string
    isRequired?: boolean
}

export const login = async ({ initData, isRequired = false }: Props) => {
    const token = Cookies.get('token')

    if (token && !isRequired) {
        return
    }

    const result = await $api.post<Token>('/user/login', { initData })
    Cookies.set('token', result.data.token, { expires: 1 })

    return result.data
}

export const register = async ({ initData, isRequired = false }: Props) => {
    const token = Cookies.get('token')

    if (token && !isRequired) {
        return
    }

    const result = await $api.post('/user/registration', { initData })
    Cookies.set('token', result.data.token, { expires: 1 })
    return result.data
}
