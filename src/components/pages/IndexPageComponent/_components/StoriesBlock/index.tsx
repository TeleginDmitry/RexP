/* eslint-disable react/jsx-no-bind */
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'

import 'swiper/css/bundle'
import 'swiper/css/pagination'
import { StoryModal } from './Modal/StoryModal'

import { useRef, useState } from 'react'

import Image from 'next/image'

import { StoryBlock } from './storyBlock'

import s from './styles.module.scss'

const whoRex = '/images/stories/who_rex.png'
const rexFind = '/images/stories/rex_find.png'
const faq = '/images/stories/faq.png'
const delivery = '/images/stories/delivery.png'
const garant = '/images/stories/garant.png'
const sizes = '/images/stories/sizes.png'

export const StoriesBlock = () => {
    const dispatch = useAppDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const [activeStory, setActiveStory] = useState<any>(null)
    const [selectedStoryKey, setSelectedStoryKey] = useState<number>(0)
    const selKeyRef = useRef<number>()
    selKeyRef.current = selectedStoryKey
    const stories = [
        {
            id: 1,
            text: 'Кто такой Rex?',
            textColor: '#000',
            backgroundColor: '#94FE00',
            image: {
                url: whoRex,
                style: {
                    right: 0,
                    bottom: 0,
                    transform: 'translate(20px,20%)',
                    width: '100%',
                    maxWidth: 200
                }
            },
            story: {
                backgroundColor: '#94FE00',
                progressColor: 0,
                textColor: '#000000',
                pages: [{}, {}]
            }
        },
        {
            id: 2,
            text: 'Rex-найдет',
            textColor: '#fff',
            backgroundColor: '#F633F6',
            image: {
                url: rexFind,
                style: {
                    right: 0,
                    bottom: 0,
                    width: '65%',
                    maxWidth: 200
                }
            },
            story: {
                backgroundColor: '#F633F6',
                progressColor: 1,
                textColor: '#ffffff',
                pages: [{}, {}]
            }
        },
        {
            id: 3,
            text: 'Помощник',
            textColor: '#fff',
            backgroundColor: '#4923BE',
            image: {
                url: faq,
                style: {
                    bottom: 0,
                    width: '80%',
                    maxWidth: 200
                }
            },
            story: {
                backgroundColor: '#4923BE',
                progressColor: 1,
                textColor: '#ffffff',
                pages: [{}, {}]
            }
        },
        {
            id: 4,
            text: 'Rex-доставка',
            textColor: '#000',
            backgroundColor: '#94FE00',
            image: {
                url: delivery,
                style: {
                    right: 0,
                    bottom: 0,
                    width: '75%',
                    maxWidth: 200
                }
            },
            story: {
                backgroundColor: '#94FE00',
                progressColor: 0,
                textColor: '#000000',
                pages: [{}, {}, {}]
            }
        },
        {
            id: 5,
            text: 'Гарантия',
            textColor: '#fff',
            backgroundColor: '#F633F6',
            image: {
                url: garant,
                style: {
                    bottom: 0,
                    width: '80%',
                    maxWidth: 200
                }
            },
            story: {
                backgroundColor: '#F633F6',
                progressColor: 1,
                textColor: '#fff',
                pages: [{}, {}, {}]
            }
        },
        {
            id: 6,
            text: 'Размеры',
            textColor: '#fff',
            backgroundColor: '#4923BE',
            image: {
                url: sizes,
                style: {
                    bottom: 0,
                    width: '80%',
                    maxWidth: 200
                }
            },
            story: {
                backgroundColor: '#4923BE',
                progressColor: 1,
                textColor: '#fff',
                pages: [{}, {}]
            }
        }
    ]
    const openModal = (key) => {
        setSelectedStoryKey(key)
        setActiveStory(stories[key])
        setModalOpen(true)
    }
    const back = () => {
        setModalOpen(false)
        setActiveStory(null)
        setSelectedStoryKey(0)
    }
    const prevStory = () => {
        if (selectedStoryKey !== 0) {
            setActiveStory(stories[selectedStoryKey - 1])
            setSelectedStoryKey((p) => p - 1)
        }
    }
    const nextStory = () => {
        if (
            selKeyRef.current &&
            selKeyRef.current >= 0 &&
            selKeyRef.current < stories.length - 1
        ) {
            setActiveStory(stories[selKeyRef.current + 1])
            setSelectedStoryKey(selKeyRef.current + 1)
            return true
        }
        return false
    }
    return (
        <Swiper spaceBetween={10} slidesPerView={3} className={s.slider}>
            {stories.map((item, key) => (
                <SwiperSlide
                    className={s.swpsl}
                    onClick={() => openModal(key)}
                    key={item.id}
                >
                    <StoryBlock item={item} />
                </SwiperSlide>
            ))}
            <StoryModal
                nextStory={nextStory}
                prevStory={prevStory}
                activeStory={activeStory}
                isOpen={modalOpen}
                onBack={back}
            />
        </Swiper>
    )
}
