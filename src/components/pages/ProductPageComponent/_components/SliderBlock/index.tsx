import Image from "next/image";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";
import "swiper/css/pagination";

import photo1 from "@/public/images/mock/photo3.png";

import s from "./SliderBlock.module.scss";

const SliderBlock = () => (
  <Swiper
    pagination={{
      clickable: true,
      bulletActiveClass: `${s["slider-bullet-active"]}`,
      bulletClass: `${s["slider-bullet"]}`,
      el: `.${s["pagination-container"]}`,
    }}
    autoplay={{ delay: 8500, disableOnInteraction: false }}
    modules={[Pagination, Autoplay]}
    className={s.slider}
  >
    <SwiperSlide>
      <div className={s.wrapper}>
        <Image src={photo1} alt="" fill sizes="(max-width: 768px) 100vw, 200vw" />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className={s.wrapper}>
        <Image src={photo1} alt="" fill sizes="(max-width: 768px) 100vw, 200vw" />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className={s.wrapper}>
        <Image src={photo1} alt="" fill sizes="(max-width: 768px) 100vw, 200vw" />
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className={s.wrapper}>
        <Image src={photo1} alt="" fill sizes="(max-width: 768px) 100vw, 200vw" />
      </div>
    </SwiperSlide>
    <div className={s["pagination-container"]} />
  </Swiper>
);

export default SliderBlock;
