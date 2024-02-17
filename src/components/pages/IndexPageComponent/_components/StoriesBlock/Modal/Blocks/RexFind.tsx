import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import React from 'react'
import s from '../../styles.module.scss'
import Image from 'next/image'

export const RexFind = ({ setSwiper, Story }) => (
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
                style={{ bottom: 0, width: '100%' }}
                src={'/images/stories/story-back/rexFind/1.png'}
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />

            <div className={s['modal-title']}>Не нашёл товар в каталоге?</div>

            <div className={s['modal-text']}>
                Rex поможет тебе найти нужную вещь. Просто следуй небольшой
                инструкции:
                <br />
                <br />
                <div className={s.list}>
                    <div className={s['list-row']}>
                        В приложении Poizon скопируй ссылку на понравившийся
                        товар
                    </div>
                    <div className={s['list-row']}>
                        Вернись в наше приложение и нажми на баннер «Rex найдёт»
                        на главной странице
                    </div>
                    <div className={s['list-row']}>Вставь ссылку на товар</div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide
            style={{ color: Story.story.textColor }}
            className={s['modal-body']}
        >
            <Image
                style={{ bottom: '7%', width: '95%' }}
                src={'/images/stories/story-back/rexFind/2.png'}
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <Image
                style={{ width: '70%', top: 0, right: 0 }}
                src={'/images/stories/story-back/rexFind/3.png'}
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <div className={s['modal-title']}>Вуаля! Ты превосходен!</div>

            <div className={s['modal-text']}>
                Осталось только заказать товар и дождаться доставки. Обещаем,
                постараемся довезти твою попкупочку как можно быстрее
            </div>
        </SwiperSlide>
    </Swiper>
)
