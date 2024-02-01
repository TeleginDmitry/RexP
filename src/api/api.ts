/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import Cookies from 'js-cookie'

const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${Cookies.get('token')}`
    }
})

export default $api
