import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import React from "react";
import s from "../../styles.module.scss";
import Image from "next/image";

export const WhoRex = ({setSwiper, Story}) =>

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
          style={{right:0,bottom:"2%",width:"100%"}}
          src={"/images/stories/story-back/whoRex/1.png"}
          className={s["story-back-image"]}
          alt='rexIcon'
          width={100}
          height={100}
        />
        <Image
          style={{bottom:"25%",width:"50%"}}
          src={"/images/stories/story-back/whoRex/2.png"}
          className={s["story-back-image"]}
          alt='rexIcon'
          width={100}
          height={100}
        />
        <div
          className={s['modal-title']}
        >
          Кто такой Rex?
        </div>

        <div
          className={s['modal-text']}
        >
          Rex – твой персональный помощник в мире моды и крутых образов. Он предлагает более 20 000 товаров. Но и это
          ещё не всё!<br/><br/>
          Rex может доставить тебе любой товар из каталога Poizon (к слову, там более 4 000 000 позиций). Просто
          воспользуйся функцией «Rex найдёт»
        </div>

      </SwiperSlide>
      <SwiperSlide style={{color: Story.story.textColor}} className={s["modal-body"]}>
        <Image
          style={{bottom:"12%",width:"60%"}}
          src={"/images/stories/story-back/whoRex/3.png"}
          className={s["story-back-image"]}
          alt='rexIcon'
          width={100}
          height={100}
        />
        <Image
          style={{width:"100%",bottom:0,right:0}}
          src={"/images/stories/story-back/whoRex/4.png"}
          className={s["story-back-image"]}
          alt='rexIcon'
          width={100}
          height={100}
        />
        <div
          className={s['modal-title']}
        >
          «А это точно оригинал?»
        </div>

        <div
          className={s['modal-text']}
        >
          Конечно! За оригинальность товаров переживать не стоит, все строго проверяется<br/><br/>
          Гарантия качества и оригинальности — ключевая политика Poizon
        </div>
      </SwiperSlide>

    </Swiper>
  )

