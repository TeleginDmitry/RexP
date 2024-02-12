/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import Cookies from 'js-cookie'

import { IS_DEV } from '../constants'

const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

$api.interceptors.request.use((config) => {
    const token = Cookies.get('token')

    if (config && config.headers) {
        config.headers.Authorization = `Bearer ${
            token || IS_DEV ? process.env.NEXT_PUBLIC_API_TOKEN : ''
        }`
    }

    return config
})

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            error.config._isRetry = true

            Cookies.remove('token')
        }
    }
)

export default $api
