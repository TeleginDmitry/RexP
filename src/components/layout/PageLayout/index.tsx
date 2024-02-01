import { useEffect, useState } from 'react'

import clsx from 'clsx'
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'
import { Toaster } from 'sonner'

import { inter, manrope } from '@/src/assets/fonts/fonts'
import { login, register } from '@/src/utils/api/getToken'

import Footer from '../_components/Footer'

import s from './PageLayout.module.scss'

const PageLayout = ({ children }) => {
    const [test, setTest] = useState('')

    useEffect(() => {
        async function saveToken() {
            try {
                const app = window.Telegram.WebApp
                app.ready()

                const { initData } = app

                const token = Cookies.get('token')

                if (!token) {
                    const resultLogin = await login({ initData })

                    if (resultLogin.data.token) {
                        Cookies.set('token', resultLogin.data.token, {
                            expires: 7
                        })
                        setTest(resultLogin.data.token)
                    } else {
                        const resultRegister = await register({ initData })

                        if (resultRegister.data.token) {
                            Cookies.set('token', resultRegister.data.token, {
                                expires: 7
                            })

                            setTest(resultRegister.data.token)
                        }
                    }
                }
            } catch (error) {
                /* empty */
            }
        }

        saveToken()
    }, [])

    return (
        <div
            className={clsx(
                s['page-wrapper'],
                manrope.variable,
                inter.variable
            )}
        >
            <h1 className='z-[10000]'>{test}</h1>
            <main className={s['page-layout']}>{children}</main>
            <Footer />
            <Toaster position='top-center' richColors />
        </div>
    )
}

export default PageLayout
