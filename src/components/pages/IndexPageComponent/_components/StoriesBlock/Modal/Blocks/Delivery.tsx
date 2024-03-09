import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/bundle'
import 'swiper/css/pagination'
import React from 'react'

import s from '../../styles.module.scss'

import Image from 'next/image'

export const Delivery = ({ setSwiper, Story }) => (
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
                style={{ width: '100%', bottom: 0, right: 0 }}
                src='/images/stories/story-back/delivery/1.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <Image
                style={{ bottom: '20%', left: 0, width: '50%' }}
                src='/images/stories/story-back/delivery/2.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <div className={s['modal-title']}>Как Rex доставит твой товар?</div>

            <div className={s['modal-text']}>
                Надёжно и быстро. Мы гарантируем, что твой заказ доедет в
                целости и сохранности
                <span style={{ color: '#F633F6' }}>
                    примерно за 3 недели
                </span>{' '}
                благодаря работе опытных специалистов транспортной компании
            </div>
        </SwiperSlide>
        <SwiperSlide
            style={{ color: Story.story.textColor }}
            className={s['modal-body']}
        >
            <Image
                style={{ width: '100%', bottom: 0, right: 0 }}
                src='/images/stories/story-back/delivery/3.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <Image
                style={{ bottom: '25%', left: 0, width: '50%' }}
                src='/images/stories/story-back/delivery/4.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <div className={s['modal-title']}>Выбери свой вариант</div>

            <div className={s['modal-text']}>
                <div className={s.list}>
                    <div className={`${s['list-row']} ${s['list-row__black']}`}>
                        Доставка курьером прямо до твоей двери
                    </div>
                    <div
                        className={`${s['list-row']}  ${s['list-row__black']}`}
                    >
                        Получение товара в пункте выдачи заказов, который
                        расположен ближе всего к твоему адресу
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide
            style={{ color: Story.story.textColor }}
            className={s['modal-body']}
        >
            <Image
                style={{ width: '100%', bottom: 0, right: 0 }}
                src='/images/stories/story-back/delivery/5.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <Image
                style={{ bottom: '12%', right: 0, width: '60%' }}
                src='/images/stories/story-back/delivery/6.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />

            <div className={`${s['modal-text']} ${s['modal-center']}`}>
                Не стесняйся обращаться к нам с любыми вопросами — мы всегда
                готовы помочь тебе с доставкой
            </div>
        </SwiperSlide>
    </Swiper>
)
