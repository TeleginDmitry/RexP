/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import type { AxiosError } from 'axios'
import axios from 'axios'

import { login, register } from '../utils/api/getToken'

interface ResponseError extends AxiosError {
    _isRetry: boolean
}

const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

$api.interceptors.response.use(
    (response) => response,
    async (error: ResponseError) => {
        if (error.response?.status === 401 && error.config && !error._isRetry) {
            error._isRetry = true

            localStorage.removeItem('token')

            const { initData } = window.Telegram.WebApp

            try {
                const loginResult = await login({ initData, isRequired: true })
                const token = loginResult?.token
                error.config.headers.Authorization = `Bearer ${token}`
                return await $api.request(error.config)
            } catch (loginError) {
                try {
                    const registerResult = await register({
                        initData,
                        isRequired: true
                    })
                    const token = registerResult?.token
                    error.config.headers.Authorization = `Bearer ${token}`
                    return await $api.request(error.config)
                } catch (registerError) {
                    /* empty */
                }
            }
        }
        return Promise.reject(error)
    }
)

export default $api
