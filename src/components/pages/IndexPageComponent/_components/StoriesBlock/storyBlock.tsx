import React, { useState } from 'react'
import s from '@/src/components/pages/IndexPageComponent/_components/StoriesBlock/styles.module.scss'
import Image from 'next/image'

export const StoryBlock = ({ item }) => {
    const [photoReady, setPhotoReady] = useState(false)

    return (
        <div
            style={{
                backgroundColor: item.backgroundColor
            }}
            className={s.wrapper}
        >
            <span
                style={{ color: item.textColor }}
                className={s['wrapper-text']}
            >
                {item.text}
            </span>
            <Image
                priority
                style={{
                    ...item.image.style,
                    visibility: photoReady ? 'visible' : 'hidden'
                }}
                src={item.image.url}
                onLoadingComplete={() => setPhotoReady(true)}
                className={s['story-block-img']}
                alt='rexIcon'
                width={100}
                height={100}
            />
        </div>
    )
}
