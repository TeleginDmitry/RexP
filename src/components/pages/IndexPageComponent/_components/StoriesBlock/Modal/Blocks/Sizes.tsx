import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import React from 'react'
import s from '../../styles.module.scss'
import Image from 'next/image'

export const Sizes = ({ setSwiper, Story }) => (
    <Swiper
        onSwiper={(swp) => {
            setSwiper(swp)
        }}
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={false}
        className={s.slider}
    >
        <SwiperSlide
            style={{ color: Story.story.textColor }}
            className={s['modal-body']}
        >
            <Image
                style={{ bottom: '20%', left: 0, width: '50%' }}
                src={'/images/stories/story-back/sizes/2.png'}
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <Image
                style={{ width: '80%', bottom: 0, right: 0 }}
                src={'/images/stories/story-back/sizes/1.png'}
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <div className={s['modal-title']}>Как не ошибиться с размером?</div>

            <div className={`${s['modal-text']} ${s['row-gap']}`}>
                <div className={s['text-block']}>
                    <span style={{ color: '#F633F6' }}>
                        Измерь свои параметры
                    </span>
                    <span>
                        Длину стопы — для заказа обуви; окружность талии, груди
                        и бёдер — для заказа одежды
                    </span>
                </div>
                <div className={s['text-block']}>
                    <span style={{ color: '#F633F6' }}>
                        Учитывай особенности
                    </span>
                    <span>
                        Некоторые бренды могут выпускать модели, которые немного
                        больше или меньше русского размера
                    </span>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide
            style={{ color: Story.story.textColor }}
            className={s['modal-body']}
        >
            <Image
                style={{ bottom: '15%', left: 0, width: '40%' }}
                src={'/images/stories/story-back/sizes/4.png'}
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <Image
                style={{ width: '100%', bottom: 0, right: 0 }}
                src={'/images/stories/story-back/sizes/3.png'}
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <div className={s['modal-title']}>Важно!</div>

            <div className={s['modal-text']}>
                <div className={s['text-block']}>
                    <span style={{ color: '#F633F6' }}>
                        Основной размер у нас — EUR
                    </span>
                    <span>
                        EUR — обычно на 1 деление больше русского. Например,
                        если ты носишь 40, значит в EUR размере — 41
                    </span>
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
)
