/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from 'react'

import { Modal } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'

import { HeaderTitle } from '@/src/components/ui/HeaderTitle/HeaderTitle'
import { ImagesBlock } from '@/src/components/ui/ImagesBlock/ImagesBlock'
import MainContainer from '@/src/components/ui/MainContainer'
import SpecificBlock from '@/src/components/ui/SpecificBlock/SpecificBlock'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getOrdersThunk } from '@/src/store/slices/orders/thunks'

import image from 'public/images/global/image6.png'

const ReviewPage = () => {
    const orders = useAppSelector((state) => state.orders.data)

    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [activeId, setActiveId] = useState(0)

    function handleVisibleModal() {
        setIsVisibleModal((state) => !state)
    }

    function handleOpenModal(number: number) {
        setActiveId(number)
        setIsVisibleModal(true)
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([dispatch(getOrdersThunk({ isReviwed: false }))])
    }, [])

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>

            <MainContainer>
                <HeaderTitle title='Ждут отзыва' />
                {orders.length ? (
                    <div className='mt-10'>
                        {orders.map(
                            ({
                                delivery,
                                totalPrice,
                                id,
                                createdAt,
                                orderContents
                            }) => {
                                const createdAtDate = new Date(
                                    createdAt
                                ).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long'
                                })

                                const currentDate = new Date(createdAt)
                                currentDate.setDate(currentDate.getDate() + 21)
                                const expectDate =
                                    currentDate.toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long'
                                    })

                                const imagesFull = orderContents?.map(
                                    ({ product }) => ({
                                        ...product.images[0],
                                        isOuter: product.isOuter
                                    })
                                )

                                return (
                                    <div
                                        key={id}
                                        className='w-full p-6 rounded-3xl bg-[#EEE] flex flex-col gap-5 mt-4 relative'
                                    >
                                        <Link
                                            href={`/profile/delivery/${id}`}
                                            className='absolute top-0 right-0 w-full h-full z-10'
                                        />
                                        <div className='flex items-center justify-between pb-3 border-b border-[rgba(142,142,142,0.40)] border-solid w-full'>
                                            <p className='text-base'>
                                                Заказ от{' '}
                                                <span className='font-semibold'>
                                                    {createdAtDate}
                                                </span>
                                            </p>
                                            <span className='text-base text-[#8E8E8E]'>
                                                {id}
                                            </span>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex flex-col gap-3'>
                                                <p>
                                                    <span className='font-semibold'>
                                                        Дата доставки:
                                                    </span>{' '}
                                                    {expectDate}
                                                </p>

                                                <div className='flex flex-col gap-2'>
                                                    <p className='font-semibold'>
                                                        Получатель
                                                    </p>
                                                    <span>
                                                        {delivery.firstName}{' '}
                                                        {delivery.lastName}{' '}
                                                        {delivery.patronymic}
                                                    </span>
                                                    <span>
                                                        {delivery.number.replace(
                                                            /(\d)(\d{3})(\d{3})(\d{2})(\d{2})/,
                                                            '+$1 $2 $3 $4 $5'
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <p className='font-semibold'>
                                                    Адрес доставки
                                                </p>
                                                <span className='font-normal'>
                                                    {delivery.city},{' '}
                                                    {delivery.street}
                                                    {delivery.deliveryType
                                                        .id === 2 &&
                                                        `, ${delivery.house}`}
                                                </span>
                                            </div>

                                            <p>
                                                <span className='font-semibold'>
                                                    Сумма заказа:
                                                </span>{' '}
                                                {new Intl.NumberFormat(
                                                    'ru-RU'
                                                ).format(totalPrice)}{' '}
                                                ₽
                                            </p>
                                        </div>
                                        {imagesFull && (
                                            <ImagesBlock images={imagesFull} />
                                        )}
                                        <button
                                            onClick={() => handleOpenModal(id)}
                                            className='p-3 bg-black rounded-xl text-white font-bold text-base relative z-20'
                                        >
                                            Оставить отзыв
                                        </button>
                                    </div>
                                )
                            }
                        )}
                    </div>
                ) : (
                    <div className='mt-8'>
                        <SpecificBlock
                            imageUrl={image.src}
                            text='Но ты можешь это исправить ;) Воспользуйся каталогом или поиском для выбора товаров'
                            title='У тебя нет заказов, которые ждут отзыва'
                        />
                    </div>
                )}
            </MainContainer>

            <Modal isOpen={isVisibleModal} onClose={handleVisibleModal}>
                <div className='fixed top-0 left-0 z-[1000000] p-4 flex justify-center items-center w-full h-full bg-black bg-opacity-40'>
                    <div className='p-5 rounded-[20px] max-w-80 bg-white flex flex-col gap-2'>
                        <div className=' flex flex-col gap-1'>
                            <h2 className='text-base font-semibold'>
                                Хотите оставить отзыв на заказ?
                            </h2>
                            <p className='text-sm'>
                                Для того, чтобы оставить отзыв на полученный
                                заказ, необходимо перейти в бот для отзывов
                            </p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <button
                                style={{ borderRadius: 10 }}
                                className='w-full text-base font-semibold py-2 px-1 text-white text-center bg-black'
                            >
                                <Link
                                    href={`https://t.me/poizonrex_bot?start=order${activeId}`}
                                >
                                    Да, перейти в бот для отзывов
                                </Link>
                            </button>
                            <button
                                className='w-full text-base font-semibold text-black py-2 px-1 text-center'
                                onClick={handleVisibleModal}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ReviewPage
