import { Snippet } from "@nextui-org/react";

import DefaultLink from "@/src/components/ui/links/DefaultLink";

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
];

const OrdersBlock = () => (
  <div className={s.wrapper}>
    {orders.map(({ time, id, status, expectedDate, trackNumber }) => (
      <div className={s.order} key={id}>
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
      </div>
    ))}
  </div>
);

export default OrdersBlock;
