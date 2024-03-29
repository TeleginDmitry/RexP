/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
import { Button, Snippet } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { ImagesBlock } from '@/src/components/ui/ImagesBlock/ImagesBlock'
import InViewWrapper from '@/src/components/ui/InViewWrapper'
import DefaultLink from '@/src/components/ui/links/DefaultLink'
import SpecificBlock from '@/src/components/ui/SpecificBlock/SpecificBlock'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import image1 from 'public/images/global/image4.png'
import image2 from 'public/images/global/image5.png'
import image3 from 'public/images/global/image7.png'

import s from './OrdersBlock.module.scss'

const OrdersBlock = () => {
    const router = useRouter()

    const activeFilter = useAppSelector(
        (state) => state.filters.myOrdersPage.activeFilter
    )

    const orders = useAppSelector((state) => state.orders.data)

    const neededOrders = orders.filter(
        ({ orderStatus }) =>
            (activeFilter === 'Ждут оплаты' && orderStatus.id === 1) ||
            (activeFilter === 'Завершенные' && orderStatus.id === 8) ||
            (activeFilter === 'В доставке' &&
                orderStatus.id >= 2 &&
                orderStatus.id <= 7)
    )

    if (!neededOrders.length) {
        return (
            <SpecificBlock
                imageUrl={
                    activeFilter === 'Ждут оплаты'
                        ? image2.src
                        : activeFilter === 'Завершенные'
                        ? image3.src
                        : activeFilter === 'В доставке'
                        ? image1.src
                        : ''
                }
                text={
                    activeFilter === 'В доставке'
                        ? 'Но ты можешь это исправить ;) Воспользуйся каталогом или поиском для выбора товаров'
                        : activeFilter === 'Ждут оплаты'
                        ? 'Но ты можешь приобрести что-нибудь ;) Воспользуйся каталогом или поиском для выбора товаров'
                        : 'Но ты можешь это исправить ;) Воспользуйся каталогом или поиском для выбора товаров'
                }
                title={
                    activeFilter === 'В доставке'
                        ? 'У тебя нет товаров в доставке'
                        : activeFilter === 'Ждут оплаты'
                        ? 'Все твои заказы оплачены'
                        : 'У тебя ещё не было заказов'
                }
            />
        )
    }

    function onBuy() {
        const selected = neededOrders.map(({ orderContents }) =>
            orderContents?.map(({ id }) => id)
        )
        const totalPrice = neededOrders
            .map(({ totalPrice }) => totalPrice)
            .reduce((a, b) => a + b, 0)

        const totalPriceWithDiscount = neededOrders.reduce(
            (acc, { orderContents }) => {
                orderContents?.forEach(({ product, count, productSize }) => {
                    acc +
                        productSize.price *
                            count *
                            ((100 - product.discount) / 100)
                })

                return acc
            },
            0
        )

        localStorage.setItem(
            'selectedCartsInfo',
            JSON.stringify({
                selectedCarts: selected,
                totalPrice,
                totalPriceWithDiscount
            })
        )

        router.push('/gocheckout')
    }

    return (
        <div className={s.wrapper}>
            {neededOrders.map(
                (
                    { orderStatus, trackNumber, orderContents, createdAt, id },
                    index
                ) => {
                    const createdDate = new Date(createdAt).toLocaleDateString(
                        'ru-RU',
                        { day: 'numeric', month: 'long' }
                    )

                    const currentDate = new Date(createdAt)
                    currentDate.setDate(currentDate.getDate() + 21)
                    const expectDate = currentDate.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long'
                    })

                    const imagesFull = orderContents?.map(({ product }) => ({
                        ...product.images[0],
                        isOuter: product.isOuter
                    }))

                    return (
                        <InViewWrapper key={id} className={s.orderWrapper}>
                            {({ isInView }) => (
                                <motion.div
                                    className={s.order}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: isInView ? 1 : 0,
                                        y: isInView ? 0 : 30
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index < 2 ? 0.1 * index : 0.15
                                    }}
                                >
                                    <div className={s.header}>
                                        <div className={s.time}>
                                            <span>Заказ от</span>
                                            <span>{createdDate}</span>
                                        </div>
                                        <div className={s.id}>{id}</div>
                                    </div>
                                    <div className={s.status}>
                                        <div className={s.name}>Статус:</div>
                                        <span>{orderStatus.name}</span>
                                    </div>
                                    <div className={s.expectedDate}>
                                        <div className={s.name}>
                                            Ожидаемая дата доставки:
                                        </div>
                                        <span>{expectDate}</span>
                                    </div>
                                    <div className={s.trackNumber}>
                                        <div className={s.name}>
                                            Трек номер:
                                        </div>
                                        <Snippet
                                            className={s.snippet}
                                            tooltipProps={{
                                                className: s.tooltip,
                                                content: 'Скопировать номер'
                                            }}
                                        >
                                            {trackNumber}
                                        </Snippet>
                                    </div>

                                    {imagesFull && (
                                        <ImagesBlock images={imagesFull} />
                                    )}
                                    {orderStatus.id === 1 && (
                                        <Button
                                            onClick={onBuy}
                                            className='w-full p-4 bg-black rounded-xl text-white text-base font-bold'
                                        >
                                            Перейти к оплате
                                        </Button>
                                    )}
                                    <DefaultLink
                                        href={`/profile/delivery/${id}`}
                                        className={s.link}
                                        aria-label='на страницу заказа'
                                    />
                                </motion.div>
                            )}
                        </InViewWrapper>
                    )
                }
            )}
        </div>
    )
}

export default OrdersBlock
