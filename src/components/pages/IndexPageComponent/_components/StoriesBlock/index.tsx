/* eslint-disable react/jsx-no-bind */
import {
  useAppDispatch,
  useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import {Pagination, Autoplay} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

import s from "./styles.module.scss";

import {StoryModal} from "@/src/components/pages/IndexPageComponent/_components/StoriesBlock/Modal/StoryModal";
import {useState} from "react";


export const StoriesBlock = () => {
  const dispatch = useAppDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const [activeStory,setActiveStory] = useState<any>(null)
  const stories = [
    {
      id:1,
      text: "Что умеет Rex?",
      backgroundColor: "#94FE00",
      story:{
        backgroundColor:"#94FE00",
        progressColor:"#000000",
        textColor:"#000000",
        pages: [
          {
            id:1,
            title:"Кто такой Rex?",
            text:"Rex – твой персональный помощник в мире моды и крутых образов. Он предлагает более 15 000 товаров. Но и это ещё не всё!<br/><br/>" +
              "Rex может доставить тебе любой товар из каталога Poizon (к слову, там более 4 000 000 позиций). Просто воспользуйся функцией «Rex найдёт»"
          },
          {
            id:2,
            title:"«А это точно оригинал?»",
            text:"Конечно! За оригинальность товаров переживать не стоит, все строго проверяется<br/><br/>"+
              "Гарантия качества и оригинальности — ключевая политика Poizon"
          }
        ]
      }

    },
    {
      id:2,
      text: "Rex-доставка",
      backgroundColor: "#F633F6",
      story:{
        backgroundColor:"#F633F6",
        progressColor:"#FFFFFF",
        textColor:"#ffffff",
        pages: [
          {
            id:1,
            title:"Как Rex доставит твой товар?",
            text:"Надёжно и быстро. Мы гарантируем, что твой заказ доедет в целости и сохранности <span style='color:#4923BE'>примерно за 3 недели</span> благодаря работе опытных специалистов транспортной компании"
          },
          {
            id:2,
            title:"Выбери свой вариант",
            text:"Конечно! За оригинальность товаров переживать не стоит, все строго проверяется<br/><br/>"+
              "Гарантия качества и оригинальности — ключевая политика Poizon"
          },
          {
            id:3,
            title:"",
            text:"Не стесняйся обращаться к нам с любыми вопросами — мы всегда готовы помочь тебе с доставкой"
          }
        ]
      }
    },
    {
      id:3,
      text: "FAQ",
      backgroundColor: "#4923BE",
      story:{
        backgroundColor:"#4923BE",
        progressColor:"#FFFFFF",
        textColor:"#ffffff",
        pages: [
          {
            id:1,
            title:"Не нашёл товар в каталоге?",
            text:"Rex поможет тебе найти нужную вещь. Просто следуй небольшой инструкции:<br/> ...."
          },
          {
            id:2,
            title:"Вуаля! Ты превосходен!",
            text:"Осталось только заказать товар и дождаться доставки. Обещаем, постараемся довезти твою попкупочку как можно быстрее"
          }
        ]
      }
    },
    {
      id:4,
      text: "Размеры",
      backgroundColor: "#94FE00",
      story:{
        backgroundColor:"#94FE00",
        progressColor:"#000000",
        textColor:"#000000",
        pages: [
          {
            id:1,
            title:"Какие гарантии, что мне приедет оригинальный товар без брака?",
            text:"Все товары проходят проверку ещё в Китае, поэтому такая ситуация исключена. Если товар не прошёл проверку, покупка будет отменена и Poizon вернёт деньги"
          },
          {
            id:2,
            title:"А вдруг что‑то пойдёт не так?‥",
            text:"Не волнуйся, если вдруг возникла проблема с заказанными товарами, то мы полностью на твоей стороне!<br/><br/>" +
              "Мы предоставляем гарантию, которая обеспечивает компенсацию в случае дефектов или проблем с товаром<br/><br/>" +
              "Мы возместим вам от 30% до 100% стоимости товара в зависимости от характера проблемы"
          },
          {
            id:3,
            title:"",
            text:"Не бойся  рассказать о возникшей проблеме. Rex рассмотрит твой случай индивидуально и предложит наилучший выход из ситуации"
          }
        ]
      }
    }
  ];
  const openModal = key =>{
    setActiveStory(stories[key])
    setModalOpen(true)
  }
  const back = e =>{
    setModalOpen(false)
    setActiveStory(null)
  }
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      autoplay={{delay: 8500, disableOnInteraction: false}}
      modules={[Autoplay]}
      className={s.slider}
    >
      {stories.map((item, key) => (
        <SwiperSlide onClick={()=>openModal(key)} key={item.id}>
          <div style={{backgroundColor: item.backgroundColor}} className={s.wrapper}>
            <span className={s.wrapperText}>{item.text}</span>
          </div>
        </SwiperSlide>
      ))}
      <StoryModal activeStory={activeStory} isOpen={modalOpen} onBack={back}/>
    </Swiper>
  )
}
