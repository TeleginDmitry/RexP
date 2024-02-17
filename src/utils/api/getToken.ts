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
        Cookies.set('token', result.data.token)
    } catch (error) {
        /* empty */
    }
}

export const register = async (valuesData: Props) => {
    const token = Cookies.get('token')

    if (token) {
        return
    }

    try {
        const result = await $api.post('/user/registration', valuesData)
        Cookies.set('token', result.data.token)
        window.location.reload()
    } catch (error) {
        /* empty */
    }
}
