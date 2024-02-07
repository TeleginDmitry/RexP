/* eslint-disable consistent-return */
import clsx from 'clsx'
import Image from 'next/image'

import type { DeliveryTypeOrImagesEntityOrBrandOrOrderStatus } from '@/src/types/order.types'

import styles from './ImagesBlock.module.scss'

interface Props {
    images: Array<{
        id: number
        name: string
        isOuter: boolean
    }>
}
export const ImagesBlock = ({ images }: Props) => {
    const imagesSliced = images.slice(0, 3)

    return (
        <div className={styles.photos}>
            {imagesSliced.map(({ name, id, isOuter }) => (
                <div className={styles.photo} key={id}>
                    <Image
                        src={
                            isOuter
                                ? name
                                : `${process.env.NEXT_PUBLIC_IMAGES_URL}${name}`
                        }
                        alt='фото'
                        width={100}
                        height={100}
                    />
                </div>
            ))}
            {images.length > 3 && (
                <div className={clsx(styles.more, styles.photo)}>
                    <span>+{images.length - 3}</span>
                </div>
            )}
        </div>
    )
}
