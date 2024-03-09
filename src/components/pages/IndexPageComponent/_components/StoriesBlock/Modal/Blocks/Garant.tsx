import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/bundle'
import 'swiper/css/pagination'
import React from 'react'

import s from '../../styles.module.scss'

import Image from 'next/image'

export const Garant = ({ setSwiper, Story }) => (
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
                src='/images/stories/story-back/garant/1.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <div className={s['modal-title']}>
                Какие гарантии, что мне приедет оригинальный товар без брака?
            </div>

            <div className={s['modal-text']}>
                Все товары проходят проверку ещё в Китае, поэтому такая ситуация
                исключена. Если товар не прошёл проверку, покупка будет отменена
                и Poizon вернёт деньги
            </div>
        </SwiperSlide>
        <SwiperSlide
            style={{ color: Story.story.textColor }}
            className={s['modal-body']}
        >
            <Image
                style={{ width: '80%', bottom: '2%', right: 0 }}
                src='/images/stories/story-back/garant/2.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <Image
                style={{ bottom: '7%', left: 0, width: '70%' }}
                src='/images/stories/story-back/garant/3.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />
            <div className={s['modal-title']}>
                А вдруг что‑то пойдёт не так?‥
            </div>

            <div className={s['modal-text']}>
                Не волнуйся, если вдруг возникла проблема с заказанными
                товарами, то мы полностью на твоей стороне!
                <br />
                <br />
                Мы предоставляем гарантию, которая обеспечивает компенсацию в
                случае дефектов или проблем с товаром
                <br />
                <br />
                Мы возместим вам от 30% до 100% стоимости товара в зависимости
                от характера проблемы
            </div>
        </SwiperSlide>
        <SwiperSlide
            style={{ color: Story.story.textColor }}
            className={s['modal-body']}
        >
            <Image
                style={{ width: '100%', bottom: 0, right: 0 }}
                src='/images/stories/story-back/garant/4.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />

            <Image
                style={{ bottom: '12%', right: 0, width: '60%' }}
                src='/images/stories/story-back/garant/5.png'
                className={s['story-back-image']}
                alt='rexIcon'
                width={100}
                height={100}
            />

            <div className={`${s['modal-text']} ${s['modal-center']}`}>
                Не бойся рассказать о возникшей проблеме. Rex рассмотрит твой
                случай индивидуально и предложит наилучший выход из ситуации
            </div>
        </SwiperSlide>
    </Swiper>
)
