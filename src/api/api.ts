/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import axios, { isAxiosError } from 'axios'
import Cookies from 'js-cookie'

import { login, register } from '../utils/api/getToken'

const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    const token = Cookies.get('token')

    if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            error.config._isRetry = true

            const { initData } = window.Telegram.WebApp

            try {
                const response = await Promise.all([
                    login({ initData }),
                    register({ initData })
                ])

                if (
                    response[0]?.status === 200 ||
                    response[1]?.status === 200
                ) {
                    return await $api.request(error.config)
                }
            } catch (error) {
                if (isAxiosError(error) && error.status === 403) {
                    Cookies.remove('token')
                }
            }
        }
        return Promise.reject(error)
    }
)

export default $api
