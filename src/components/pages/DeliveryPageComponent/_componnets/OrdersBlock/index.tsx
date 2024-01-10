import { Snippet } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

import photo1 from "@/public/images/mock/photo1.png";
import photo2 from "@/public/images/mock/photo2.png";
import photo3 from "@/public/images/mock/photo3.png";
import InViewWrapper from "@/src/components/ui/InViewWrapper";
import DefaultLink from "@/src/components/ui/links/DefaultLink";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import s from "./OrdersBlock.module.scss";

const orders = [
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src, photo1.src, photo2.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "786810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "686810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "586810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "486810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src],
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
    photos: [photo1.src, photo2.src, photo3.src],
  },
];

const OrdersBlock = () => {
  const activeFilter = useAppSelector((state) => state.filters.myOrdersPage.activeFilter);

  return (
    <div className={s.wrapper}>
      {activeFilter === "В доставке" &&
        orders.map(({ time, id, status, expectedDate, trackNumber, photos }, index) => (
          <InViewWrapper key={id} className={s.orderWrapper}>
            {({ isInView }) => (
              <motion.div
                className={s.order}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index < 2 ? 0.1 * index : 0.15 }}
              >
                <div className={s.header}>
                  <div className={s.time}>
                    <span>Заказ от</span>
                    <span>{time}</span>
                  </div>
                  <div className={s.id}>{id}</div>
                </div>
                <div className={s.status}>
                  <div className={s.name}>Статус</div>
                  <span>{status}</span>
                </div>
                <div className={s.expectedDate}>
                  <div className={s.name}>Ожидаемая дата доставки</div>
                  <span>{expectedDate}</span>
                </div>
                <div className={s.trackNumber}>
                  <div className={s.name}>Трек номер</div>
                  <Snippet className={s.snippet} tooltipProps={{ className: s.tooltip, content: "Скопировать номер" }}>
                    {trackNumber}
                  </Snippet>
                </div>
                <div className={s.photos}>
                  {photos.slice(0, 3).map((photo) => (
                    <div className={s.photo} key={`${id}_${photo}`}>
                      <Image src={photo} alt="фото" width={100} height={100} />
                    </div>
                  ))}
                  {photos.length > 3 && (
                    <div className={clsx(s.more, s.photo)}>
                      <span>+{photos.length - 3}</span>
                    </div>
                  )}
                </div>
                <DefaultLink href={`/profile/delivery/${id}`} className={s.link} aria-label="на страницу заказа" />
              </motion.div>
            )}
          </InViewWrapper>
        ))}
    </div>
  );
};

export default OrdersBlock;
