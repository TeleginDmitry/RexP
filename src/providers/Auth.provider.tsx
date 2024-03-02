/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import { useEffect, useState } from 'react'

import { isAxiosError } from 'axios'
import { Cookies } from 'js-cookie'

import { login, register } from '../utils/api/getToken'

export default function AuthProvider({ children }) {
    const [isAccess, setIsAccess] = useState(false)

    async function auth() {
        const { initData } = window.Telegram.WebApp

        try {
            await login({ initData })
        } catch (loginError) {
            try {
                await register({
                    initData
                })
            } catch (registerError) {
                if (
                    isAxiosError(registerError) &&
                    registerError.status === 403
                ) {
                    Cookies.remove('token')
                }
            }
        }

        setIsAccess(true)
    }

    useEffect(() => {
        auth()
    }, [])

    if (!isAccess) {
        return null
    }

    return children
}
