import { useEffect } from 'react'

import clsx from 'clsx'
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'
import { Toaster } from 'sonner'

import { inter, manrope } from '@/src/assets/fonts/fonts'
import { login, register } from '@/src/utils/api/getToken'

import Footer from '../_components/Footer'

import s from './PageLayout.module.scss'

const PageLayout = ({ children }) => {
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
                    } else {
                        const resultRegister = await register({ initData })

                        if (resultRegister.data.token) {
                            Cookies.set('token', resultRegister.data.token, {
                                expires: 7
                            })
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
            <main className={s['page-layout']}>{children}</main>
            <Footer />
            <Toaster position='top-center' richColors />
        </div>
    )
}

export default PageLayout
