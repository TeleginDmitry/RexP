import Image from 'next/image'
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/bundle'
import 'swiper/css/pagination'

import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import s from './SliderBlock.module.scss'

const SliderBlock = () => {
    const images = useAppSelector((state) => state.product.data.images)

    return (
        <Swiper
            pagination={{
                clickable: true,
                bulletActiveClass: `${s['slider-bullet-active']}`,
                bulletClass: `${s['slider-bullet']}`,
                el: `.${s['pagination-container']}`
            }}
            autoplay={{ delay: 8500, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className={s.slider}
        >
            {images.map(({ name, id }) => (
                <SwiperSlide key={id}>
                    <div className={s.wrapper}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${name}`}
                            alt=''
                            fill
                            sizes='(max-width: 768px) 100vw, 200vw'
                        />
                    </div>
                </SwiperSlide>
            ))}
            <div className={s['pagination-container']} />
        </Swiper>
    )
}

export default SliderBlock
