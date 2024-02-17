import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import 'swiper/css/pagination'

import s from "../styles.module.scss";

import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Progress,
  ModalFooter, Button
} from "@nextui-org/react";
import React, {createRef, useEffect, useRef, useState} from "react";
import RootIcon from "@/src/components/ui/icons/RootIcon";
import {WhoRex} from "./Blocks/WhoRex";
import {RexFind} from "./Blocks/RexFind";
import {Faq} from "./Blocks/Faq";
import {Delivery} from "./Blocks/Delivery";
import {Garant} from "./Blocks/Garant";
import {Sizes} from "./Blocks/Sizes";


export const StoryModal = ({onBack, nextStory, prevStory, activeStory, isOpen = false}) => {
  const [timer, setTimer] = useState(0)
  const listenerContextMenu = event => event.preventDefault();
  const [touch, setTouch] = useState(false)
  const [swiper, setSwiper] = useState<any>(null);
  const swiperRef = useRef<any>()
  swiperRef.current = swiper;
  const timerRef = useRef<any>()
  const touchRef = useRef<any>()
  touchRef.current = touch;
  timerRef.current = timer;
  const [activePage, setActivePage] = useState(0)
  const activePageRef = useRef<any>()
  const activeStoryRef = useRef<any>()
  activePageRef.current = activePage
  activeStoryRef.current = activeStory

  const storiesBlocks = [
    <WhoRex key={1} Story={activeStory} setSwiper={setSwiper}/>,
    <RexFind key={2} Story={activeStory} setSwiper={setSwiper}/>,
    <Faq key={3} Story={activeStory} setSwiper={setSwiper}/>,
    <Delivery key={4} Story={activeStory} setSwiper={setSwiper}/>,
    <Garant key={5} Story={activeStory} setSwiper={setSwiper}/>,
    <Sizes key={6} Story={activeStory} setSwiper={setSwiper}/>,
  ];

  useEffect(() => {
    if (activeStory) {
      setActivePage(0)
      setTimer(0)
    }
  }, [activeStory])

  const slideTo = (index) => {
    if (swiperRef && swiperRef.current) {
      try {
        swiperRef.current.slideTo(index)
      }catch (e){
        console.log(e)
      }
    }
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (timerRef.current < 8) {
        if (!touchRef.current)
          setTimer((v) => v + .1);
      } else if (activeStoryRef && activeStoryRef.current && activePageRef.current < activeStoryRef.current.story.pages.length - 1) {
        setTimer(0)
        slideTo(activePageRef.current + 1)
        setActivePage(v => v + 1)
      }else if(nextStory()){
        setTimer(0)
        slideTo(0)
        setActivePage(0)
      }else{
        onBack();
      }
    }, 50);

    return () => clearInterval(interval);

  }, []);
  const onTouch = (e) => {
    const x = e.clientX;
    if (e.target.localName === "img") {
      setTouch(false)
      return;
    }
    if (x < 80) {
      const p = activePageRef.current;
      if (p === 0) {
        setActivePage(0)
        slideTo(0)
        prevStory();
      } else {
        setActivePage(p - 1)
        slideTo(p - 1)
      }

      setTimer(0)
    } else if (x > (window.screen.width - 80)) {
      const p = activePageRef.current;
      if (p < (activeStory.story.pages.length - 1)) {
        setActivePage(p + 1);
        slideTo(p + 1);
      } else if(nextStory()){
          setActivePage(0)
          slideTo(0)
      }else{
        onBack();
      }

      setTimer(0)
    }
    setTouch(false)
  }

  return activeStory ? (
    <Modal onPointerUp={onTouch} onPointerDown={() => setTouch(true)} className={s.modal} hideCloseButton={true}
           style={{backgroundColor: activeStory ? activeStory.story.backgroundColor : ""}}
           classNames={{header: s.modalHead, body: s.body, wrapper: s.modal}} size={"full"} isOpen={isOpen}
           onClose={onBack}>
      <ModalContent>
        <>
          <ModalHeader className={"flex flex-row gap-2"}>
            {activeStory.story.pages.map((x, k) => (
              <Progress disableAnimation={true} classNames={
                {
                  base: activeStory.story.progressColor === 0 ? s["track-black"] : s["track-white"],
                  indicator: activeStory.story.progressColor === 0 ? s["track-value-black"] : s["track-value-white"],
                }
              } key={x.id}
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

            {activeStory && storiesBlocks[activeStory.id-1]}


          </ModalBody>

        </>
      </ModalContent>
    </Modal>
  ) : <div></div>;

}
