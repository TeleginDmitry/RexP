import { Snippet } from "@nextui-org/react";
import { motion } from "framer-motion";

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
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
  {
    time: "21 ноября",
    id: "886810867",
    status: "В доставке",
    expectedDate: "15 декабря",
    trackNumber: "1158640945",
  },
];

const OrdersBlock = () => {
  const activeFilter = useAppSelector((state) => state.filters.myOrdersPage.activeFilter);

  return (
    <div className={s.wrapper}>
      {activeFilter === "В доставке" &&
        orders.map(({ time, id, status, expectedDate, trackNumber }, index) => (
          <InViewWrapper key={id} className={s.orderWrapper}>
            {({ isInView }) => (
              <motion.div
                className={s.order}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index < 3 ? 0.1 * index : 0.15 }}
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
                  <Snippet className={s.snippet}>{trackNumber}</Snippet>
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
