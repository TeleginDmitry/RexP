/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import { useEffect, useState } from 'react'

import { isAxiosError } from 'axios'
import { Cookies } from 'js-cookie'

import { login, register } from '../utils/api/getToken'

export default function AuthProvider({ children }) {
    const [isAccess, setIsAccess] = useState(false)

    async function auth() {
        // const { initData } = window.Telegram.WebApp

        const initData =
            'query_id=AAHu-3RHAAAAAO77dEdpXIY6&user=%7B%22id%22%3A1198849006%2C%22first_name%22%3A%22%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9%22%2C%22last_name%22%3A%22%D0%A2%D0%B5%D0%BB%D0%B5%D0%B3%D0%B8%D0%BD%22%2C%22username%22%3A%22d1mas1k2%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1709309814&hash=1c87ab0281215feddf394b459ac2a3b38870a7e099dca7ea42dd49b34a974a4c'

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
