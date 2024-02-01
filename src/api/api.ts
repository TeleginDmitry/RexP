import axios from 'axios'

const $api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
    }
})

export default $api
