/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react'

import { Analytics } from '@vercel/analytics/react'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import App from 'next/app'
import { useRouter } from 'next/router'

import PageLayout from '@/src/components/layout/PageLayout'
import AppContextProvider from '@/src/context/AppContextProvider'
import { getBrandsThunk } from '@/src/store/slices/getBrands/getBrands/getBrands'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { getColorsThunk } from '@/src/store/slices/getColors/getColors/getColors'
import { getSizesThunk } from '@/src/store/slices/getSizes/getSizes/getSizes'
import { wrapper } from '@/src/store/store'

import '@/styles/color/_color.scss'
import '@/styles/index.scss'
import '@/styles/nullable.css'
import { getOrdersThunk } from '@/src/store/slices/orders/thunks'

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
            <PageLayout>
                <Component {...pageProps} />
                {/* {process.env.NEXT_PUBLIC_BUILD_PROFILE !== "test" && <Analytics />} */}
            </PageLayout>
        </AppContextProvider>
    )
}

RexPApp.getInitialProps = wrapper.getInitialAppProps(
    ({ dispatch }) =>
        async (context: AppContext): Promise<AppInitialProps> => {
            const ctx = await App.getInitialProps(context)

            if (typeof window === 'undefined') {
                await Promise.all([
                    dispatch(getCartsThunk({})),
                    dispatch(getColorsThunk()),
                    dispatch(getSizesThunk()),
                    dispatch(getBrandsThunk()),
                    dispatch(getOrdersThunk({}))
                ])
            }

            return { ...ctx }
        }
)

export default RexPApp
