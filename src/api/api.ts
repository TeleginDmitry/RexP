/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import type { AxiosError } from 'axios'
import axios, { isAxiosError } from 'axios'
import Cookies from 'js-cookie'

import { login, register } from '../utils/api/getToken'

interface ResponseError extends AxiosError {
    _isRetry: boolean
}

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
    async (error: ResponseError) => {
        if (error.response?.status === 401 && error.config && !error._isRetry) {
            error._isRetry = true

            // const { initData } = window.Telegram.WebApp

            const initData =
                'query_id=AAHu-3RHAAAAAO77dEdgIqFN&user=%7B%22id%22%3A1198849006%2C%22first_name%22%3A%22%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%D0%A2%D0%B5%D0%BB%D0%B5%D0%B3%D0%B8%D0%BD%22%2C%22username%22%3A%22d1mas1k2%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1708670131&hash=bcab6be7c1d518e491479f8b860b34a9ceb3b55566f08274c51c3d98f4ecc48f'

            try {
                const loginResult = await login({ initData, isRequired: true })
                const token = loginResult?.token || Cookies.get('token')
                error.config.headers.Authorization = `Bearer ${token}`
                return await $api.request(error.config)
            } catch (loginError) {
                try {
                    const registerResult = await register({
                        initData,
                        isRequired: true
                    })
                    const token = registerResult?.token || Cookies.get('token')
                    error.config.headers.Authorization = `Bearer ${token}`
                    return await $api.request(error.config)
                } catch (registerError) {
                    if (
                        isAxiosError(registerError) &&
                        registerError.status === 403
                    ) {
                        Cookies.remove('token')
                    }
                }
            }
        }
        return Promise.reject(error)
    }
)

export default $api
