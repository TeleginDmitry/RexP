import clsx from 'clsx'
import Image from 'next/image'

import type { ProductCardProps } from './types'

import HeartIcon from '../icons/HeartIcon'
import DefaultLink from '../links/DefaultLink'

import s from './ProductCard.module.scss'

const ProductCard: React.FC<ProductCardProps> = ({
    className,
    name,
    id,
    isOuter,
    imgUrl,
    imagePriority,
    price,
    outOfStock,
    variant = 'default'
}) => {
    const slicedName = name.slice(0, 40)

    return (
        <div
            className={clsx(
                s.wrapper,
                className,
                s[variant],
                outOfStock && s.outOfStock
            )}
        >
            <Image
                src={
                    isOuter
                        ? imgUrl
                        : `${process.env.NEXT_PUBLIC_IMAGES_URL}${imgUrl}`
                }
                alt={name}
                width={variant === 'default' ? 145 : 101}
                height={variant === 'default' ? 107 : 59}
                priority={imagePriority}
                className={s.image}
                quality={100}
            />
            <DefaultLink href={`/catalog/${id}`} className={s.link} />
            <div className={s.content}>
                {outOfStock && (
                    <div className={s.outOfStock}>Нет в наличии</div>
                )}
                <div className={clsx(s.info, s[variant])}>
                    <span className={s.price}>
                        {Number.isNaN(price)
                            ? price
                            : new Intl.NumberFormat('ru-RU').format(
                                  Math.round(+price)
                              )}{' '}
                        ₽
                    </span>
                    <p className={`${s.name} break-all text-sm`}>
                        {slicedName}
                        {slicedName.length < name.length ? '...' : ''}
                    </p>
                </div>
                <HeartIcon
                    productId={id}
                    className={s.heart}
                    variant={variant}
                />
            </div>
        </div>
    )
}

export default ProductCard
