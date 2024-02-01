/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'

import { Modal } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'

import { HeaderTitle } from '@/src/components/ui/HeaderTitle/HeaderTitle'
import { ImagesBlock } from '@/src/components/ui/ImagesBlock/ImagesBlock'
import MainContainer from '@/src/components/ui/MainContainer'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'
import { getOrdersThunk } from '@/src/store/slices/orders/thunks'
import { wrapper } from '@/src/store/store'

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

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>
            <MainContainer>
                <HeaderTitle title='Ждут отзыва' />
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
                            const expectDate = currentDate.toLocaleDateString(
                                'ru-RU',
                                {
                                    day: 'numeric',
                                    month: 'long'
                                }
                            )

                            const imagesFull = orderContents?.map(
                                ({ product }) => product.images?.[0]
                            )

                            return (
                                <div
                                    key={id}
                                    className='w-full p-6 rounded-3xl bg-[#EEE] flex flex-col gap-5 mt-4'
                                >
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
                                                    {delivery.number?.replace(
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
                                                {delivery.deliveryPointAddress}
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
                                    <ImagesBlock images={imagesFull} />
                                    <button
                                        onClick={() => handleOpenModal(id)}
                                        className='p-4 bg-black rounded-xl text-white font-bold text-base'
                                    >
                                        Оставить отзыв
                                    </button>
                                </div>
                            )
                        }
                    )}
                </div>
            </MainContainer>
            <Modal isOpen={isVisibleModal} onClose={handleVisibleModal}>
                <div className='fixed top-0 left-0 z-[10000] p-4 flex justify-center items-center w-full h-full bg-black bg-opacity-40'>
                    <div className='rounded-xl max-w-72 bg-[#b9b9b9] flex flex-col gap-2'>
                        <div className='px-4 pt-4 flex flex-col gap-1 items-center'>
                            <h2 className='text-base font-semibold text-center'>
                                Хотите оставить отзыв на заказ?
                            </h2>
                            <p className='text-center text-sm'>
                                Для того, чтобы оставить отзыв на полученный
                                заказ, необходимо перейти в бот для отзывов.
                            </p>
                        </div>
                        <div>
                            <button className='w-full text-base font-semibold text-[#007AFF] py-2 px-1 text-center border-t border-b border-l-0 border-r-0 border-solid border-[rgba(60,60,67,0.36)]'>
                                <Link
                                    href={`https://t.me/poizonrex_reviews_bot?start=order${activeId}`}
                                >
                                    Перейти в бот для отзывов
                                </Link>
                            </button>
                            <button
                                className='w-full text-base font-semibold text-[#007AFF] py-2 px-1 text-center'
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

export const getServerSideProps = wrapper.getServerSideProps(
    ({ dispatch, getState }) =>
        async (context) => {
            await Promise.all([dispatch(getOrdersThunk({ isReviwed: false }))])

            return {
                props: {}
            }
        }
)

export default ReviewPage
