/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */

import $api from '@/src/api/api'

interface Token {
    token: string
}

interface Props {
    initData: string
    isRequired?: boolean
}

export const login = async ({ initData, isRequired = false }: Props) => {
    const token = localStorage.getItem('token')

    if (token && !isRequired) {
        return
    }

    const result = await $api.post<Token>('/user/login', { initData })
    localStorage.setItem('token', result.data.token)

    return result.data
}

export const register = async ({ initData, isRequired = false }: Props) => {
    const token = localStorage.getItem('token')

    if (token && !isRequired) {
        return
    }

    const result = await $api.post('/user/registration', { initData })
    localStorage.setItem('token', result.data.token)
    return result.data
}
