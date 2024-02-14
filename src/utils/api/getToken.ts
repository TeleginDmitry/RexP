/* eslint-disable consistent-return */
import Cookies from 'js-cookie'

import $api from '@/src/api/api'

interface Token {
    token: string
}

interface Props {
    initData: string
}

export const login = async (valuesData: Props) => {
    const token = localStorage.getItem('token')

    if (token) {
        return
    }

    try {
        const result = await $api.post<Token>('/user/login', valuesData)
        localStorage.setItem('token', result.data.token)

        return result
    } catch (error) {
        /* empty */
    }
}

export const register = async (valuesData: Props) => {
    const token = localStorage.getItem('token')

    if (token) {
        return
    }

    try {
        const result = await $api.post('/user/registration', valuesData)
        localStorage.setItem('token', result.data.token)

        return result
    } catch (error) {
        /* empty */
    }
}
