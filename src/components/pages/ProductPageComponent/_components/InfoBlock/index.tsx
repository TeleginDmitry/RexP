import clsx from 'clsx'

import HeartIcon from '@/src/components/ui/icons/HeartIcon'
import RootIcon from '@/src/components/ui/icons/RootIcon'
import DefaultLink from '@/src/components/ui/links/DefaultLink'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import s from './InfoBlock.module.scss'

const InfoBlock = () => {
    const { id, productSizes, discount, name, price } = useAppSelector(
        (state) => state.product.data
    )
    const activeSize = useAppSelector(
        (state) => state.filters.sizes.activeFilter
    )

    if (!activeSize) {
        return null
    }

    const productSize = productSizes.find(
        ({ size }) => size.name === activeSize
    )
    const newPrice = productSize?.price
        ? +(productSize.price - (productSize.price * discount) / 100).toFixed(0)
        : price

    return (
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
                    <DefaultLink
                        aria-label='Ссылка на оригинальную страницу'
                        href={`t.me/poizonrex_bot?start=product${id}`}
                    >
                        <RootIcon name='link' />
                    </DefaultLink>
                </div>
            </div>
            <div className={s.name}>{name}</div>
        </div>
    )
}

export default InfoBlock
