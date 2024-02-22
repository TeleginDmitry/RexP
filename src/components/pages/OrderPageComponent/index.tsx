/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-shadow */

import { useRouter } from 'next/router'

import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import RootIcon from '../../ui/icons/RootIcon'
import MainContainer from '../../ui/MainContainer'
import ProductLess from '../../ui/ProductLess/ProductLess'
import { TrackNumber } from '../../ui/trackNumber/TrackNumber'

import s from './OrderPageComponent.module.scss'

const OrderPageComponent = () => {
    const {
        id,
        createdAt,
        orderStatus,
        orderContents,
        totalPrice,
        delivery,
        trackNumber
    } = useAppSelector((state) => state.order)

    const router = useRouter()

    const createdDate = new Date(createdAt)

    const currentDate = new Date(createdAt)
    currentDate.setDate(currentDate.getDate() + 21)
    const expectDate = currentDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long'
    })

    return (
        <MainContainer className={s.wrapper}>
            <div className={s.header}>
                <div
                    onClick={() => {
                        router.back()
                    }}
                    className={s.link}
                    aria-label='Назад'
                >
                    <RootIcon name='arrowLeft' />
                </div>
                <h1 className={s.title}>
                    Заказ от{' '}
                    {createdDate.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long'
                    })}
                    <span>№ {id}</span>
                </h1>
            </div>

            <div className='p-6 rounded-3xl bg-[#EEE] flex flex-col gap-5 mt-4'>
                <div className='flex items-center justify-between pb-3 border-b border-[rgba(142, 142, 142, 0.40)] border-solid'>
                    <span className='text-base'>Информация о заказе</span>
                    <span className='text-xs py-1 px-3 rounded-xl bg-black text-white font-bold text-center'>
                        {orderStatus.name}
                    </span>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>Получатель</p>
                        <div className='flex flex-col gap-2'>
                            <span>
                                {delivery.firstName} {delivery.lastName}{' '}
                                {delivery.patronymic}
                            </span>
                            <span>
                                {delivery.number?.replace(
                                    /(\d)(\d{3})(\d{3})(\d{2})(\d{2})/,
                                    '+$1 $2 $3 $4 $5'
                                )}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-semibold'>
                            {delivery.deliveryType.id === 1
                                ? 'Доставка в пункт выдачи'
                                : 'Доставка на адрес'}
                        </p>
                        <span className='font-normal'>
                            {delivery.city}, {delivery.street}
                            {delivery.deliveryType.id === 2 &&
                                `, ${delivery.house}`}
                        </span>
                    </div>
                    <p>
                        <span className='font-semibold'>
                            Ожидаемая дата доставки:
                        </span>{' '}
                        {expectDate}
                    </p>
                    <TrackNumber trackNumber={trackNumber} />
                    <p>
                        <span className='font-semibold'>Сумма заказа:</span>{' '}
                        {new Intl.NumberFormat('ru-RU').format(totalPrice)} ₽
                    </p>

                    <div className='flex flex-col gap-5'>
                        <p className='font-semibold'>Товары</p>
                        <div className='flex flex-col gap-2'>
                            {orderContents?.map(
                                ({ product, id, productSize }) => (
                                    <ProductLess
                                        key={id}
                                        id={id}
                                        isOuter={product.isOuter}
                                        images={product.images}
                                        name={product.name}
                                        price={productSize.price}
                                        sizeName={productSize.size.name}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export default OrderPageComponent
