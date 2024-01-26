import { Snippet } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

import InViewWrapper from "@/src/components/ui/InViewWrapper";
import DefaultLink from "@/src/components/ui/links/DefaultLink";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import s from "./OrdersBlock.module.scss";

const OrdersBlock = () => {
  const activeFilter = useAppSelector((state) => state.filters.myOrdersPage.activeFilter);

  const orders = useAppSelector((state) => state.orders.data);

  const neededOrders = orders.filter(({ orderStatus }) => orderStatus.name === activeFilter);

  return (
    <div className={s.wrapper}>
      {neededOrders.map(({ orderStatus, trackNumber, orderContents, createdAt, id }, index) => {
        const createdDate = new Date(createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

        const currentDate = new Date(createdAt);
        currentDate.setDate(currentDate.getDate() + 21);
        const expectDate = currentDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

        const imagesFull = orderContents?.map(({ product }) => product.images).flat();

        return (
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
                    <span>{createdDate}</span>
                  </div>
                  <div className={s.id}>{id}</div>
                </div>
                <div className={s.status}>
                  <div className={s.name}>Статус:</div>
                  <span>{orderStatus.name}</span>
                </div>
                <div className={s.expectedDate}>
                  <div className={s.name}>Ожидаемая дата доставки:</div>
                  <span>{expectDate}</span>
                </div>
                <div className={s.trackNumber}>
                  <div className={s.name}>Трек номер:</div>
                  <Snippet className={s.snippet} tooltipProps={{ className: s.tooltip, content: "Скопировать номер" }}>
                    {trackNumber}
                  </Snippet>
                </div>
                <div className={s.photos}>
                  {imagesFull?.slice(0, 3).map((image) => (
                    <div className={s.photo} key={image?.id}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${image?.name}`}
                        alt="фото"
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                  {imagesFull && imagesFull.length > 3 && (
                    <div className={clsx(s.more, s.photo)}>
                      <span>+{imagesFull.length - 3}</span>
                    </div>
                  )}
                </div>
                <DefaultLink href={`/profile/delivery/${id}`} className={s.link} aria-label="на страницу заказа" />
              </motion.div>
            )}
          </InViewWrapper>
        );
      })}
    </div>
  );
};

export default OrdersBlock;
