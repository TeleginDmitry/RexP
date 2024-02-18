/* eslint-disable import/no-cycle */
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
    const token = Cookies.get('token')

    if (token) {
        return
    }

    try {
        const result = await $api.post<Token>('/user/login', valuesData)
        Cookies.set('token', result.data.token, { expires: 7 })

        return result
    } catch (error) {
        Cookies.remove('token')
    }
}

export const register = async (valuesData: Props) => {
    const token = Cookies.get('token')

    if (token) {
        return
    }

    try {
        const result = await $api.post('/user/registration', valuesData)
        Cookies.set('token', result.data.token, { expires: 7 })
        return result
    } catch (error) {
        Cookies.remove('token')
    }
}
