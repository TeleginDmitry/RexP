/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'

import clsx from 'clsx'

import HeartIcon from '@/src/components/ui/icons/HeartIcon'
import RootIcon from '@/src/components/ui/icons/RootIcon'
import DefaultLink from '@/src/components/ui/links/DefaultLink'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import { ProductModal } from '../Modal'

import s from './InfoBlock.module.scss'

const InfoBlock = () => {
    const { id, productSizes, discount, name, price } = useAppSelector(
        (state) => state.product.data
    )
    const activeSize = useAppSelector(
        (state) => state.filters.sizes.activeFilter
    )

    const [toggleModal, setToggleModal] = useState(false)

    if (!activeSize) {
        return null
    }

    const productSize = productSizes.find(
        ({ size }) => size.name === activeSize
    )
    const newPrice = productSize?.price
        ? +(productSize.price - (productSize.price * discount) / 100).toFixed(0)
        : price

    function toggleModalHandler() {
        setToggleModal((state) => !state)
    }

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.header}>
                    {productSize && (
                        <div
                            className={clsx(
                                s['price-block'],
                                newPrice.toString().length > 5 && 'flex-col'
                            )}
                        >
                            <div className={s.price}>
                                {' '}
                                {Number.isNaN(newPrice)
                                    ? newPrice
                                    : new Intl.NumberFormat('ru-RU').format(
                                          newPrice
                                      )}{' '}
                                ₽
                            </div>
                            {discount !== 0 && (
                                <div className={s['old-price']}>
                                    {Number.isNaN(productSize.price)
                                        ? price
                                        : new Intl.NumberFormat('ru-RU').format(
                                              productSize.price
                                          )}{' '}
                                    ₽
                                </div>
                            )}
                        </div>
                    )}

                    <div className={s['actions-block']}>
                        <HeartIcon productId={id} />
                        <button onClick={toggleModalHandler}>
                            <RootIcon name='link' />
                        </button>
                    </div>
                </div>
                <div className={s.name}>{name}</div>
            </div>

            {toggleModal && (
                <ProductModal
                    isOpen={toggleModal}
                    onClose={toggleModalHandler}
                    productId={id}
                />
            )}
        </>
    )
}

export default InfoBlock
