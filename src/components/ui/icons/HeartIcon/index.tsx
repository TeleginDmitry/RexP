import { useId, useState } from 'react'

import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { toast } from 'sonner'

import { MAX_FAVOURITES_PRODUCTS } from '@/src/constants'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { getFavoritesThunk } from '@/src/store/slices/getFavorite/getFavorite/getFavorite'
import { createFavorite } from '@/src/utils/api/createFavorite'
import { deleteFavorite } from '@/src/utils/api/deleteFavorite'

import s from './HeartIcon.module.scss'

interface HeartIconProps {
    productId: number | string
    className?: string
    variant?: 'default' | 'small'
}

const HeartIcon: React.FC<HeartIconProps> = ({
    productId,
    className,
    variant = 'default'
}) => {
    const favorites = useAppSelector((state) => state.favorites.data)
    const [isLiked, setIsLiked] = useState(
        !!favorites.find((item) => item.productId === +productId)
    )
    const linearGradientId = useId()
    const dispatch = useAppDispatch()

    const onHandleClick = () => {
        if (isLiked) {
            setIsLiked(false)
            deleteFavorite(+productId).then(() => {
                dispatch(getFavoritesThunk({}))
            })
            return
        }

        const count = favorites.length

        if (count < MAX_FAVOURITES_PRODUCTS) {
            setIsLiked(true)
            createFavorite({ productId: +productId })
        } else {
            toast.error(
                `Максимальное количество избранных продуктов: ${MAX_FAVOURITES_PRODUCTS}`
            )
        }
    }

    return (
        <Button
            isIconOnly
            className={clsx(
                'text-default-900/60 data-[hover]:bg-foreground/10',
                className,
                s[variant]
            )}
            radius='full'
            variant='light'
            aria-label='Добавить в избранное'
            onClick={onHandleClick}
        >
            <div className={clsx(s.wrapper, isLiked && s.liked)}>
                <svg
                    width='24'
                    height='23'
                    viewBox='0 0 24 23'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M11.7269 21.5L7.22692 16.8814L2.76232 12.2629C0.346926 9.71037 0.346926 5.71534 2.76232 3.16281C3.94504 2.02613 5.54698 1.43213 7.18485 1.52293C8.82272 1.61373 10.3492 2.38115 11.399 3.6416L11.7269 3.96336L12.0518 3.62775C13.1016 2.3673 14.6281 1.59987 16.2659 1.50907C17.9038 1.41827 19.5057 2.01227 20.6885 3.14896C23.1039 5.70149 23.1039 9.69651 20.6885 12.249L16.2239 16.8676L11.7269 21.5Z'
                        fill={`url(#${linearGradientId})`}
                        stroke='url(#paint1_linear_2909_314)'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <defs>
                        <linearGradient
                            id={linearGradientId}
                            x1='0.950775'
                            y1='11.5'
                            x2='22.5'
                            y2='11.5'
                            gradientUnits='userSpaceOnUse'
                        >
                            <stop stopColor='#EA1A8A' />
                            <stop offset='1' stopColor='#B20000' />
                        </linearGradient>
                        <linearGradient
                            id='paint1_linear_2909_314'
                            x1='0.950775'
                            y1='11.5'
                            x2='22.5'
                            y2='11.5'
                            gradientUnits='userSpaceOnUse'
                        >
                            <stop stopColor='#EA1A8A' />
                            <stop offset='1' stopColor='#B20000' />
                        </linearGradient>
                    </defs>
                </svg>
                <svg
                    width='24'
                    height='23'
                    viewBox='0 0 24 23'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M11.7269 21.5L7.22692 16.8814L2.76232 12.2629C0.346926 9.71037 0.346926 5.71534 2.76232 3.16281C3.94504 2.02613 5.54698 1.43213 7.18485 1.52293C8.82272 1.61373 10.3492 2.38115 11.399 3.6416L11.7269 3.96336L12.0518 3.62775C13.1016 2.3673 14.6281 1.59987 16.2659 1.50907C17.9038 1.41827 19.5057 2.01227 20.6885 3.14896C23.1039 5.70149 23.1039 9.69651 20.6885 12.249L16.2239 16.8676L11.7269 21.5Z'
                        stroke='url(#paint1_linear_2909_314)'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <defs>
                        <linearGradient
                            id='paint1_linear_2909_314'
                            x1='0.950775'
                            y1='11.5'
                            x2='22.5'
                            y2='11.5'
                            gradientUnits='userSpaceOnUse'
                        >
                            <stop stopColor='#EA1A8A' />
                            <stop offset='1' stopColor='#B20000' />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </Button>
    )
}

export default HeartIcon
