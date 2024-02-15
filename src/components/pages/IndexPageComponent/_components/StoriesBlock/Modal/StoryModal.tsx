import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

import s from "./../styles.module.scss";

import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter, Button
} from "@nextui-org/react";
import React, {createRef, useEffect, useRef, useState} from "react";
import {Progress} from "@nextui-org/progress";
import RootIcon from "@/src/components/ui/icons/RootIcon";


export const StoryModal = ({onBack, activeStory, isOpen = false}) => {
  const [timer, setTimer] = useState(0)
  const listenerContextMenu = event => event.preventDefault();
  const [touch, setTouch] = useState(false)
  const [swiper, setSwiper] = useState(null);
  const swiperRef = useRef()
  swiperRef.current = swiper;
  const timerRef = useRef()
  const touchRef = useRef()
  touchRef.current = touch;
  timerRef.current = timer;
  const [activePage, setActivePage] = useState(0)
  const activePageRef = useRef()
  const activeStoryRef = useRef()
  activePageRef.current = activePage
  activeStoryRef.current = activeStory
  useEffect(() => {
    if (activeStory) {
      setActivePage(0)
      setTimer(0)
    }
  }, [activeStory])

  const slideTo = (index) => {
    if(swiperRef && swiperRef.current)
      swiperRef.current.slideTo(index)
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (timerRef.current < 8) {
        if (!touchRef.current)
          setTimer((v) => v + .1);
      } else {
        if (activeStoryRef && activeStoryRef.current)
          if (activePageRef.current < activeStoryRef.current.story.pages.length - 1) {
            setTimer(0)
            slideTo(activePageRef.current+1)
            setActivePage(v => v + 1)
          }
      }
    }, 50);

    return () => clearInterval(interval);

  }, []);


  const onTouch = (e) => {
    var x = e.clientX;
    if(e.target.localName === "img") {
      setTouch(false)
      return;
    }
    if (x < 80) {
      let p = activePageRef.current;
      setActivePage(p === 0 ? 0 : p - 1)
      slideTo(p === 0 ? 0 : p - 1)
      setTimer(0)
    } else if (x > 380) {
      let p = activePageRef.current;
      setActivePage(p < (activeStory.story.pages.length - 1) ? p + 1 : p);
      slideTo(p < (activeStory.story.pages.length - 1) ? p + 1 : p);
      setTimer(0)
    }
    setTouch(false)
  }

  return activeStory ? (
    <Modal onPointerUp={onTouch} onPointerDown={() => setTouch(true)} className={s.modal} hideCloseButton={true}
           style={{backgroundColor: activeStory ? activeStory.story.backgroundColor : ""}}
           classNames={{header: s.modalHead, wrapper: s.modal}} size={"full"} isOpen={isOpen} onClose={onBack}>
      <ModalContent>
        <>
          <ModalHeader className={"flex flex-row gap-2"}>
            {activeStory.story.pages.map((x, k) => (
              <Progress disableAnimation={true} classNames={{base: s["pro-track"]}} key={k}
                        color={activeStory.story.progressColor} size="sm"
                        maxValue={8} minValue={0} value={activePage === k ? timer : activePage > k ? 8 : 0}/>
            ))}

          </ModalHeader>
          <ModalBody>
            <button onClick={onBack} className={s["close-button"]} color="danger" aria-label="Like">
              <Image
                src='/images/icons/xMark.svg'
                width={16}
                height={16}
                alt='search icon'
              />
            </button>
            <Swiper
              onSwiper={(swp)=>{
                setSwiper(swp)
              }}
              spaceBetween={0}
              slidesPerView={1}
              allowTouchMove={false}
              className={s.slider}
            >
              {activeStory.story.pages.map(((x, k) => (
                <SwiperSlide style={{color:activeStory.story.textColor}} className={s["modal-body"]} key={k}>
                  <div
                    className={s['modal-title']}
                  >
                    {activeStory.story.pages[k].title}
                  </div>

                  <div
                    className={s['modal-text']}
                    dangerouslySetInnerHTML={{__html: activeStory.story.pages[k].text}}
                  >

                  </div>
                </SwiperSlide>
              )))

              }

            </Swiper>

          </ModalBody>

        </>
      </ModalContent>
    </Modal>
  ) : "";

}
