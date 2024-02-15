import RootLink from '@/src/components/ui/links/RootLink'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import s from './InfoTabs.module.scss'

const InfoTabs = () => {
    const orders = useAppSelector((state) => state.orders.data)

    const deliveryCount = orders.filter(({ isReviwed }) => !isReviwed)
    const orderCounts = orders.filter(({ orderStatus }) => orderStatus.id === 1)

    return (
        <div className={s.wrapper}>
            <RootLink className={s.link} href='/profile/deliveryData'>
                <span className={s.text}>
                    Данные
                    <br />
                    доставки
                </span>
            </RootLink>
            <RootLink className={s.link} href='/profile/delivery'>
                <span className={s.count}>{orderCounts.length}</span>
                <span className={s.text}>Мои заказы</span>
            </RootLink>
            <RootLink className={s.link} href='/profile/review'>
                <span className={s.text}>Ждут отзыва</span>
                <span className={s['delivery-count']}>
                    {deliveryCount.length} заказа
                </span>
                <span className={s['review-text']}>
                    Напиши отзыв
                    <br />и получи промокод
                </span>
            </RootLink>
        </div>
    )
}

export default InfoTabs
