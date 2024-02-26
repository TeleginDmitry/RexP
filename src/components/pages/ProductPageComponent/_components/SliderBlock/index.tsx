import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/bundle'
import 'swiper/css/pagination'

import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import s from './SliderBlock.module.scss'

const SliderBlock = () => {
    const { images, isOuter } = useAppSelector((state) => state.product.data)

    return (
        <Swiper
            pagination={{
                clickable: true,
                bulletActiveClass: `${s['slider-bullet-active']}`,
                bulletClass: `${s['slider-bullet']}`,
                el: `.${s['pagination-container']}`
            }}
            modules={[Pagination]}
            className={s.slider}
            wrapperClass={s.sliderWrapper}
        >
            {images.map(({ name, id }) => (
                <SwiperSlide key={id}>
                    <div className={s.wrapper}>
                        <Image
                            src={
                                isOuter
                                    ? name
                                    : `${process.env.NEXT_PUBLIC_IMAGES_URL}${name}`
                            }
                            alt='Product image'
                            width={2500}
                            height={250}
                            quality={100}
                            className={s.image}
                        />
                    </div>
                </SwiperSlide>
            ))}
            <div className={s['pagination-container']} />
        </Swiper>
    )
}

export default SliderBlock
