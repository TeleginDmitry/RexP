import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import React from "react";
import s from "../../styles.module.scss";
import Image from "next/image";

export const Faq = ({setSwiper, Story,}) =>
   (
    <Swiper
      onSwiper={(swp) => {
        setSwiper(swp)
      }}
      spaceBetween={0}
      slidesPerView={1}
      allowTouchMove={false}
      className={s.slider}
    >
      <SwiperSlide style={{color: Story.story.textColor}} className={s["modal-body"]}>
        <Image
          style={{bottom:"20%",left:0,width:"50%"}}
          src={"/images/stories/story-back/faq/2.png"}
          className={s["story-back-image"]}
          alt='rexIcon'
          width={100}
          height={100}
        />
        <Image
          style={{width:"100%",bottom:0,right:0}}
          src={"/images/stories/story-back/faq/1.png"}
          className={s["story-back-image"]}
          alt='rexIcon'
          width={100}
          height={100}
        />
        <div
          className={s['modal-title']}
        >
          Много вопросов
          и мало ответов?
        </div>

        <div
          className={s['modal-text']}
        >
          Не беда! Rex-помощник уже спешит тебе на помощь! Не стесняйся задавать ему любые вопросы ;)<br/> <br/>
          Например, если ты столкнулся со сложностью поиска желанного товара на Poizon, просто напиши в чат. Команда Рекса обязательно найдет товар и поможет оформить заказ!
        </div>

      </SwiperSlide>
      <SwiperSlide style={{color: Story.story.textColor}} className={s["modal-body"]}>
        <Image
          style={{bottom:"12%",width:"60%"}}
          src={"/images/stories/story-back/faq/5.png"}
          className={s["story-back-image"]}
          alt='rexIcon'
          width={100}
          height={100}
        />
        <Image
          style={{width:"100%",bottom:0,right:0}}
          src={"/images/stories/story-back/faq/4.png"}
          className={s["story-back-image"]}
          alt='rexIcon'
          width={100}
          height={100}
        />
        <div
          className={s['modal-title']}
        >
          А где найти Rex-чат?
        </div>

        <div
          className={s['modal-text']}
        >
          Всё предельно просто:<br/><br/>
          <div className={s.list}>
            <div className={s["list-row"]}>
              Перейди на главную страницу
            </div>
            <div className={s["list-row"]}>
              Нажми на кнопку «Мой помощник» вверху слева
            </div>
            <div className={s["list-row"]}>
              Сообщи о проблеме в чате и ожидай ответ. Рекс и его команда совсем скоро тебе помогут :)
            </div>
          </div>
        </div>
      </SwiperSlide>

    </Swiper>
  )

