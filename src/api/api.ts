/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import Cookies from 'js-cookie'

const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

$api.interceptors.request.use(async (config) => {
    const token = Cookies.get('token')

    if (config.headers) {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    return config
})

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error.response.status === 403 &&
            error.config &&
            !error.config._isRetry
        ) {
            error.config._isRetry = true

            Cookies.remove('token')
        }
        return Promise.reject(error)
    }
)

export default $api
