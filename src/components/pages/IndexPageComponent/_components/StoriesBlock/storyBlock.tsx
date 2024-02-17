import React, { useState } from 'react'
import s from '@/src/components/pages/IndexPageComponent/_components/StoriesBlock/styles.module.scss'
import Image from 'next/image'

export const StoryBlock = ({ item }) => {
    const [photoReady, setPhotoReady] = useState(false)

    return (
        <div
            style={{
                backgroundColor: item.backgroundColor,
                opacity: photoReady ? 1 : 0,
                transition: 'opacity .5s ease'
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
                style={{ ...item.image.style }}
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
