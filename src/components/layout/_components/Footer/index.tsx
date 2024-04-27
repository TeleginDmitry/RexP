import { useState } from 'react'

import clsx from 'clsx'

import Basket from '@/public/images/icons/basket.svg'
import Favourites from '@/public/images/icons/favourites.svg'
import Home from '@/public/images/icons/home.svg'
import Profile from '@/public/images/icons/profile.svg'
import DefaultLink from '@/src/components/ui/links/DefaultLink'
import RootText from '@/src/components/ui/RootText'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import type { MenuItemType } from './types'

import s from './Footer.module.scss'

const MENU_ITEMS: MenuItemType[] = [
    { id: 1, text: 'Главная', icon: <Home />, href: '/' },
    { id: 2, text: 'Корзина', icon: <Basket />, href: '/basket' },
    { id: 3, text: 'Избранное', icon: <Favourites />, href: '/favourites' },
    { id: 4, text: 'Профиль', icon: <Profile />, href: '/profile' }
]

const Footer = () => {
    const totalItems = useAppSelector((state) => state.carts.totalItems)
    const orders = useAppSelector((state) => state.orders.data)

    const [activePageId, setActivePageId] = useState(1)

    const isExistOrders = orders.some(({ orderStatus }) => orderStatus.id === 1)

    function toggleActivePage(id: number) {
        setActivePageId(id)
    }

    return (
        <footer className={s.footer}>
            <ul className={s.menu}>
                {MENU_ITEMS.map(({ id, text, icon, href }) => (
                    <li
                        key={id}
                        className={clsx(
                            s.item,
                            activePageId === id && s.active
                        )}
                    >
                        <DefaultLink
                            onClick={() => toggleActivePage(id)}
                            href={href}
                            className={s.link}
                        >
                            {text === 'Корзина' && !!totalItems && (
                                <span className={s.count}>{totalItems}</span>
                            )}
                            {text === 'Профиль' && isExistOrders && (
                                <span className={s.count} />
                            )}
                            {icon}
                            <RootText
                                variant='11px'
                                color='grey'
                                className={s.text}
                            >
                                {text}
                            </RootText>
                        </DefaultLink>
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default Footer
