/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'

import { Button, Checkbox, CheckboxGroup, cn } from '@nextui-org/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import HeartIcon from '@/src/components/ui/icons/HeartIcon'
import InViewWrapper from '@/src/components/ui/InViewWrapper'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import CountButton from '../CountButton'
import DeleteButton from '../DeleteButton'
import HeaderBlock from '../HeaderBlock'

import s from './ProductsBlock.module.scss'

const ProductsBlock = () => {
    const router = useRouter()

    const carts = useAppSelector((state) => state.carts.data)
    const delivery = useAppSelector((state) => state.delivery.data)

    const [selected, setSelected] = useState<string[]>([])
    const [isDelete, setIsDelete] = useState(false)

    const totalPrice = carts
        .filter((cart) => selected.includes(cart.id.toString()))
        .reduce((acc, { productSize, count }) => {
            const result = acc + productSize.price * count

            return result
        }, 0)
        .toFixed(0)
    const totalPriceWithDiscount = carts
        .filter((cart) => selected.includes(cart.id.toString()))
        .reduce(
            (acc, { productSize, product, count }) =>
                acc +
                productSize.price * count * ((100 - product.discount) / 100),
            0
        )
        .toFixed(0)

    function addSelections(values: string[]) {
        setSelected(values)
    }

    async function handleClickButton() {
        if (delivery.length <= 0) {
            router.push('/profile/deliveryData')
            return
        }

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
        <>
            <HeaderBlock
                isDelete={isDelete}
                selected={selected}
                setSelected={setSelected}
                setIsDelete={setIsDelete}
            />
            <CheckboxGroup
                className={s.wrapper}
                onValueChange={addSelections}
                value={selected}
            >
                {carts.map(({ id, count, productSize, product }, index) => {
                    const slicedName = product.name.slice(0, 80)

                    return (
                        <InViewWrapper
                            key={`${id}${productSize.size.name}`}
                            className={s.product}
                        >
                            {({ isInView }) => (
                                <motion.div
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
                                    className={s['checkbox-wrapper']}
                                >
                                    <Checkbox
                                        aria-label={product.name}
                                        radius='full'
                                        size='lg'
                                        classNames={{
                                            base: clsx(
                                                cn(
                                                    'inline-flex max-w-md w-full m-0',
                                                    'hover:bg-content2 items-center justify-start',
                                                    'cursor-pointer rounded-[0px] p-[0px]  border-transparent',
                                                    'data-[selected=true]:border-primary'
                                                ),
                                                s.checkbox
                                            ),
                                            label: 'w-[calc(100%_-_35px)]'
                                        }}
                                        value={`${id}`}
                                    >
                                        <Link href={`/catalog/${product.id}`}>
                                            <div className={s.header}>
                                                <div className={s.image}>
                                                    {product.images &&
                                                        product.images[0] && (
                                                            <Image
                                                                width={170}
                                                                height={100}
                                                                src={
                                                                    product.isOuter
                                                                        ? product
                                                                              .images[0]
                                                                              .name
                                                                        : `${process.env.NEXT_PUBLIC_IMAGES_URL}${product.images[0].name}`
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                            />
                                                        )}
                                                </div>
                                                <div className={s.info}>
                                                    <div
                                                        className={
                                                            s.info__price
                                                        }
                                                    >
                                                        {new Intl.NumberFormat(
                                                            'ru-RU'
                                                        ).format(
                                                            productSize.price
                                                        )}{' '}
                                                        ₽
                                                    </div>
                                                    <div
                                                        className={`${s.info__name} text-sm line-clamp-2`}
                                                    >
                                                        {slicedName}
                                                    </div>
                                                    <div
                                                        className={s.info__size}
                                                    >
                                                        размер:{' '}
                                                        {productSize.size.name}
                                                    </div>
                                                    {productSize.amount < 5 && (
                                                        <div className='text-[#D50000] text-xs mt-1'>
                                                            Осталось менее 5
                                                            штук
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </Checkbox>
                                    <div className={s.footer}>
                                        <HeartIcon productId={product.id} />
                                        <DeleteButton
                                            onClick={() => {
                                                setIsDelete(true)
                                                setSelected([`${id}`])
                                            }}
                                        />
                                        <CountButton id={id} quantity={count} />
                                    </div>
                                </motion.div>
                            )}
                        </InViewWrapper>
                    )
                })}
            </CheckboxGroup>
            <div
                className={clsx(s.totalFooter, !!selected.length && s.visible)}
            >
                <div className={s.info}>
                    <div className={s.title}>
                        {new Intl.NumberFormat('ru-RU').format(
                            +totalPriceWithDiscount
                        )}{' '}
                        ₽ со скидками
                    </div>
                    <div className={s.description}>
                        {new Intl.NumberFormat('ru-RU').format(+totalPrice)} ₽
                    </div>
                </div>
                <div className={s.buttonWrapper}>
                    <Button onClick={handleClickButton} className={s.button}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProductsBlock
