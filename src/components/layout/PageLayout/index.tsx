import { useEffect } from 'react'

import clsx from 'clsx'
import { Toaster } from 'sonner'

import { inter, manrope } from '@/src/assets/fonts/fonts'
import { getToken } from '@/src/utils/api/getToken'

import Footer from '../_components/Footer'

import s from './PageLayout.module.scss'

const PageLayout = ({ children }) => {
    useEffect(() => {
        async function token() {
            try {
                const app = window.Telegram.WebApp
                app.ready()

                const { initData } = app

                const result = await getToken({ initData })

                localStorage.setItem('token', result.data.token)
            } catch (error) {
                /* empty */
            }
        }

        token()
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
