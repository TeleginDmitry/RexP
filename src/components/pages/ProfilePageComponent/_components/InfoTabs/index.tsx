import RootLink from "@/src/components/ui/links/RootLink";

import s from "./InfoTabs.module.scss";

const InfoTabs = () => {
  const count = 1;
  const deliveryCount = 3;

  return (
    <div className={s.wrapper}>
      <RootLink className={s.link} href="/profile/deliveryDetails">
        <span className={s.text}>
          Данные
          <br />
          доставки
        </span>
      </RootLink>
      <RootLink className={s.link} href="/profile/delivery">
        <span className={s.count}>{count}</span>
        <span className={s.text}>Мои заказы</span>
      </RootLink>
      <RootLink className={s.link} href="/profile/review">
        <span className={s.text}>Ждут отзыва</span>
        <span className={s["delivery-count"]}>{deliveryCount} заказа</span>
        <span className={s["review-text"]}>
          Напиши отзыв
          <br />и получи промокод
        </span>
      </RootLink>
    </div>
  );
};

export default InfoTabs;
