import { useRouter } from "next/router";

import RootIcon from "../../ui/icons/RootIcon";
import DefaultLink from "../../ui/links/DefaultLink";
import MainContainer from "../../ui/MainContainer";

import s from "./OrderPageComponent.module.scss";

const OrderPageComponent = () => {
  const router = useRouter();

  return (
    <MainContainer className={s.wrapper}>
      <div className={s.header}>
        <DefaultLink href="/profile/delivery" className={s.link} aria-label="Назад">
          <RootIcon name="arrowLeft" />
        </DefaultLink>
        <h1 className={s.title}>
          Заказ от 21 ноября
          <span>№ {router.query.id}</span>
        </h1>
      </div>
    </MainContainer>
  );
};

export default OrderPageComponent;
