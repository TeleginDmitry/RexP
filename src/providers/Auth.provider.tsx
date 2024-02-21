/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import { useEffect, useState } from 'react'

import { login, register } from '../utils/api/getToken'

export default function AuthProvider({ children }) {
    const [isAccess, setIsAccess] = useState(false)

    async function auth() {
        const { initData } = window.Telegram.WebApp

        try {
            await Promise.all([
                login({ initData }),
                register({ initData, isRequired: false })
            ])
        } catch (error) {
            /* empty */
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
