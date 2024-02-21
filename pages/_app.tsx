/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'

import PageLayout from '@/src/components/layout/PageLayout'
import AppContextProvider from '@/src/context/AppContextProvider'
import AuthProvider from '@/src/providers/Auth.provider'
import { wrapper } from '@/src/store/store'

import '@/styles/color/_color.scss'
import '@/styles/index.scss'
import '@/styles/nullable.css'

const RexPApp = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest)
    const { pageProps } = props
    const router = useRouter()

    useEffect(() => {
        window.Telegram.WebApp.expand()
        window.Telegram.WebApp.BackButton.isVisible = true
        window.Telegram.WebApp.BackButton.onClick(() => router.back())
    }, [router])

    useEffect(() => {
        if (router.route === '/') {
            window.Telegram.WebApp.BackButton.hide()
        } else {
            window.Telegram.WebApp.BackButton.isVisible = true
        }
    }, [router.route])

    return (
        <AppContextProvider store={store}>
            <AuthProvider>
                <PageLayout>
                    <Component {...pageProps} />
                    {/* {process.env.NEXT_PUBLIC_BUILD_PROFILE !== "test" && <Analytics />} */}
                </PageLayout>
            </AuthProvider>
        </AppContextProvider>
    )
}

RexPApp.getInitialProps = wrapper.getInitialAppProps(
    () =>
        async (context: AppContext): Promise<AppInitialProps> => {
            const ctx = await App.getInitialProps(context)

            return { ...ctx }
        }
)

export default RexPApp
