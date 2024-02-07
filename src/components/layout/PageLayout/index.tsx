import clsx from 'clsx'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Toaster } from 'sonner'

import { inter, manrope } from '@/src/assets/fonts/fonts'

import Footer from '../_components/Footer'

import s from './PageLayout.module.scss'

const PageLayout = ({ children }) => (
    <div className={clsx(s['page-wrapper'], manrope.variable, inter.variable)}>
        <main className={s['page-layout']}>{children}</main>
        <Footer />
        <Toaster position='top-center' richColors />
    </div>
)

export default PageLayout
