/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-shadow */
import { Snippet } from "@nextui-org/react";
import Image from "next/image";

import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import RootIcon from "../../ui/icons/RootIcon";
import DefaultLink from "../../ui/links/DefaultLink";
import MainContainer from "../../ui/MainContainer";

import s from "./OrderPageComponent.module.scss";

const OrderPageComponent = () => {
  const { id, createdAt, orderStatus, orderContents, totalPrice, delivery, trackNumber } = useAppSelector(
    (state) => state.order
  );

  const createdDate = new Date(createdAt);

  const currentDate = new Date(createdAt);
  currentDate.setDate(currentDate.getDate() + 21);
  const expectDate = currentDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

  return (
    <MainContainer className={s.wrapper}>
      <div className={s.header}>
        <DefaultLink href="/profile/delivery" className={s.link} aria-label="Назад">
          <RootIcon name="arrowLeft" />
        </DefaultLink>
        <h1 className={s.title}>
          {createdDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
          <span>№ {id}</span>
        </h1>
      </div>

      <div className="p-6 rounded-3xl bg-[#EEE] flex flex-col gap-5 mt-4">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(142, 142, 142, 0.40)] border-solid">
          <span className="text-base">Информация о заказе</span>
          <span className="text-xs py-1 px-3 rounded-xl bg-black text-white font-bold">{orderStatus.name}</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Получатель</p>
            <div className="flex flex-col gap-2">
              <span>
                {delivery.firstName} {delivery.lastName} {delivery.patronymic}
              </span>
              <span>{delivery.number}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Доставка в пункт выдачи</p>
            <span className="font-normal">{delivery.address}</span>
          </div>
          <p>
            <span className="font-semibold">Ожидаемая дата доставки:</span> {expectDate}
          </p>
          <div className={s.trackNumber}>
            <span className={`${s.name} font-semibold`}>Трек номер:</span>
            <Snippet className={s.snippet} tooltipProps={{ className: s.tooltip, content: "Скопировать номер" }}>
              {trackNumber}
            </Snippet>
          </div>
          <p>
            <span className="font-semibold">Сумма заказа:</span> {totalPrice}₽
          </p>

          <div className="flex flex-col gap-5">
            <p className="font-semibold">Товары</p>
            <div className="flex flex-col gap-2">
              {orderContents?.map(({ product, id, productSize }) => (
                <div className="flex gap-4 bg-white p-3 rounded-xl" key={id}>
                  {product.images && product.images[0] && (
                    <Image
                      width={100}
                      height={70}
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${product.images[0].name}`}
                      alt={product.name}
                    />
                  )}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs">{product.name}</span>
                      <span className="text-[#8E8E8E] text-xs">размер: {productSize.size?.name}</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {new Intl.NumberFormat("ru-RU").format(productSize.price)} ₽
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default OrderPageComponent;
