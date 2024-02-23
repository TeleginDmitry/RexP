/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from 'react'

import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import RootIcon from '@/src/components/ui/icons/RootIcon'
import MainContainer from '@/src/components/ui/MainContainer'
import ProductLess from '@/src/components/ui/ProductLess/ProductLess'
import RootButton from '@/src/components/ui/RootButton'
import RootTabs from '@/src/components/ui/RootTabs'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getCartsThunk } from '@/src/store/slices/getCarts/getCarts/getCarts'
import { getDeliveryThunk } from '@/src/store/slices/getDelivery/getDelivery/getDelivery'
import { createOrder } from '@/src/utils/api/createOrder'
import { getPromo } from '@/src/utils/api/getPromo'

import CheckSvg from 'public/images/icons/check.svg'
import XRedSvg from 'public/images/icons/xRed.svg'

const GocheckoutPage = () => {
    const carts = useAppSelector((state) => state.carts.data)

    const deliveryCarts = useAppSelector((state) => state.delivery.data)

    const router = useRouter()

    const [selectedCartsInfo, setSelectedCartsInfo] = useState<{
        selectedCarts: string[]
        totalPrice: number
        totalPriceWithDiscount: number
    } | null>(null)

    const [promoValue, setPromoValue] = useState('')
    const [promoStatus, setPromoStatus] = useState<
        'invalid' | 'success' | null
    >(null)

    useEffect(() => {
        const value = localStorage.getItem('selectedCartsInfo')
        const data =
            !!value &&
            (JSON.parse(value) as {
                selectedCarts: string[]
                totalPrice: number
                totalPriceWithDiscount: number
            })

        if (!data) {
            return
        }

        setSelectedCartsInfo(data)
    }, [])

    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([dispatch(getCartsThunk({})), dispatch(getDeliveryThunk())])
    }, [])

    if (!selectedCartsInfo) {
        return null
    }

    const { selectedCarts, totalPrice, totalPriceWithDiscount } =
        selectedCartsInfo

    const findMainDelivery = deliveryCarts.find(({ isMain }) => isMain)

    if (!findMainDelivery) {
        return <h1>Нужно добавить данные доставки</h1>
    }

    function onBuy() {
        try {
            const products = selectedCarts.map((value) => +value)
            createOrder({
                products,
                deliveryId: findMainDelivery!.deliveryType!.id!
            })
        } catch (error) {
            /* empty */
        }
    }

    function promoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setPromoValue(value)

        if (promoStatus) {
            setPromoStatus(null)
        }
    }

    async function checkPromo() {
        if (promoValue.length) {
            try {
                const result = await getPromo({ name: promoValue })

                if (result.data !== null) {
                    setPromoStatus('success')
                } else {
                    setPromoStatus('invalid')
                }
            } catch (error) {
                /* empty */
            }
        }
    }

    const neededCarts = carts.filter(({ id }) =>
        selectedCarts.includes(String(id))
    )

    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 21)
    const formattedDate = currentDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long'
    })

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
                <style />
            </Head>
            <MainContainer className='relative'>
                <div className='fixed  top-0 left-0 w-full z-50 flex justify-between items-center p-4 bg-white'>
                    <RootButton
                        onClick={() => router.back()}
                        aria-label='Назад'
                    >
                        <RootIcon name='arrowLeft' />
                    </RootButton>
                    <p className='text-lg font-bold'>Оформление заказа</p>
                    <div />
                </div>
                <div className='pt-12 flex flex-col gap-4'>
                    {!!findMainDelivery && (
                        <>
                            <div>
                                <h2 className='text-base font-semibold mb-2'>
                                    Способ получения
                                </h2>

                                <RootTabs
                                    className='w-full'
                                    classNames={{
                                        tabList: 'w-full ',
                                        tab: 'max-w-full !z-10'
                                    }}
                                    tabsList={[
                                        'Пункт выдачи заказа',
                                        'Курьером'
                                    ]}
                                    selectedKey={
                                        findMainDelivery.deliveryType.id === 1
                                            ? 'Пункт выдачи заказа'
                                            : 'Курьером'
                                    }
                                />
                            </div>
                            <div className='p-5 rounded-2xl bg-[#EEE] flex flex-col gap-4'>
                                <div className='border-b border-solid border-[rgba(142,142,142,0.4)] pb-3 flex items-center justify-between'>
                                    <h2 className='text-base font-medium'>
                                        Данные доставки
                                    </h2>
                                    <Link
                                        href={`profile/deliveryDetails?id=${findMainDelivery.id}`}
                                    >
                                        <Image
                                            src='images/icons/pencil.svg'
                                            width={16}
                                            height={16}
                                            alt='Редактировать'
                                        />
                                    </Link>
                                </div>
                                {!!findMainDelivery && (
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-sm font-semibold'>
                                                Адрес доставки
                                            </p>
                                            <span className='text-[#535353]'>
                                                {`${
                                                    findMainDelivery
                                                        .deliveryType.id ===
                                                        1 && 'Пункт СДЭК, '
                                                }
                            ${findMainDelivery.city}
                            ${
                                findMainDelivery.deliveryType.id === 2
                                    ? `, ${findMainDelivery.street}`
                                    : ''
                            }
                            ${
                                findMainDelivery.deliveryType.id === 2
                                    ? `, ${findMainDelivery.house}`
                                    : ''
                            }`}
                                            </span>
                                            <span className='text-sm text-[#535353]'>
                                                Срок хранения товара - 7 дней
                                            </span>
                                            <span className='text-sm text-[#535353]'>
                                                Вы можете продлить хранение ещё
                                                на 3 дня
                                            </span>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <p className='font-semibold'>
                                                Получатель
                                            </p>
                                            <span className='text-[#535353]'>
                                                {findMainDelivery.firstName}{' '}
                                                {findMainDelivery.lastName}{' '}
                                                {findMainDelivery.patronymic}
                                            </span>
                                            <span className='text-[#535353]'>
                                                {findMainDelivery.number.replace(
                                                    /(\d)(\d{3})(\d{3})(\d{2})(\d{2})/,
                                                    '+$1 $2 $3 $4 $5'
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    <div className='p-5 rounded-2xl bg-[#EEE] flex flex-col gap-4'>
                        <h2 className='border-b border-solid border-[rgba(142,142,142,0.40)] pb-3 font-medium'>
                            Информация о заказе
                        </h2>
                        <p className='text-sm'>
                            <span className='text-sm font-semibold'>
                                Ожидаемая дата доставки
                            </span>
                            : {formattedDate}
                        </p>
                        <p className='text-sm font-semibold'>
                            {neededCarts.length}{' '}
                            {neededCarts.length === 1 ? 'товар' : 'товара'} в
                            заказе
                        </p>
                        <div className='flex flex-col gap-2'>
                            {neededCarts.map(({ id, product, productSize }) => (
                                <ProductLess
                                    key={id}
                                    id={product.id}
                                    isOuter={product.isOuter}
                                    images={product.images}
                                    name={product.name}
                                    price={productSize.price}
                                    sizeName={productSize.size.name}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='p-4 rounded-2xl bg-[#EEE] flex justify-between items-center'>
                            <input
                                value={promoValue}
                                onChange={promoChange}
                                className='w-full'
                                placeholder='Введите промокод'
                            />
                            {promoStatus === 'success' ? (
                                <CheckSvg />
                            ) : promoStatus === 'invalid' ? (
                                <XRedSvg />
                            ) : (
                                <button
                                    onClick={checkPromo}
                                    className='text-base'
                                >
                                    Применить
                                </button>
                            )}
                        </div>

                        {promoStatus && (
                            <span
                                className={clsx('text-xs font-normal', {
                                    'text-[rgba(3,164,0,1)]':
                                        promoStatus === 'success',
                                    'text-[rgba(213,0,0,1)]':
                                        promoStatus === 'invalid'
                                })}
                            >
                                {promoStatus === 'success'
                                    ? 'Промокод успешно применен'
                                    : 'Промокод не действителен'}
                            </span>
                        )}
                    </div>
                    <div className='p-5 rounded-2xl bg-[#EEE] flex-col gap-3 flex'>
                        <div className='border-b border-solid border-[rgba(142,142,142,0.40)] pb-4 flex justify-between items-center'>
                            <span className='font-semibold'>Ваш заказ</span>
                            <span className='text-[#535353]'>
                                {selectedCarts.length}{' '}
                                {selectedCarts.length > 1 ? 'товара' : 'товар'}
                            </span>
                        </div>
                        <div className=' flex justify-between items-center'>
                            <span className='font-semibold'>Товары</span>
                            <span className='text-[#535353]'>
                                {new Intl.NumberFormat('ru-RU').format(
                                    totalPrice
                                )}{' '}
                                ₽
                            </span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col gap-2'>
                                <span className='font-semibold'>Скидка</span>
                            </div>
                            <span className='text-[#D50000]'>
                                -
                                {new Intl.NumberFormat('ru-RU').format(
                                    totalPrice - totalPriceWithDiscount
                                )}{' '}
                                ₽
                            </span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='font-semibold'>Доставка</span>
                            <span className='text-[#03A400]'>Бесплатно</span>
                        </div>

                        <span className='text-xs text-[rgba(142,142,142,1)] pb-3 border-b border-solid border-[rgba(142,142,142,0.40)]'>
                            Стоимость доставки указана примерно и оплачивается
                            компании СДЕК отдельно при получении
                        </span>

                        <div className='flex justify-between items-center'>
                            <span className='text-lg  font-semibold'>
                                Итого
                            </span>
                            <span className='text-black font-[900] text-lg'>
                                {new Intl.NumberFormat('ru-RU').format(
                                    totalPriceWithDiscount
                                )}{' '}
                                ₽
                            </span>
                        </div>
                        <Button
                            onClick={onBuy}
                            className='w-full p-4 bg-black rounded-xl text-white text-base font-bold'
                        >
                            Оплатить онлайн
                        </Button>
                        <p className='text-xs text-[rgba(83, 83, 83, 0.60)]'>
                            Нажимая на кнопку, вы соглашаетесь с{' '}
                            <Link href='/' className='text-[#007AFF]'>
                                Условиями обработки персональных данных
                            </Link>
                            , а также с{' '}
                            <Link href='/' className='text-[#007AFF]'>
                                Условиями продажи
                            </Link>
                        </p>
                    </div>
                </div>
            </MainContainer>
        </>
    )
}

export default GocheckoutPage
