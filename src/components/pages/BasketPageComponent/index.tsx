import { useLocalStorage } from "@mantine/hooks";

import { PRODUCTS_IN_BASKET_LS_KEY } from "@/src/constants";
import useClientSide from "@/src/hooks/useClientSide";

import MainContainer from "../../ui/MainContainer";

import s from "./BasketPageComponent.module.scss";

const BasketPageComponent = () => {
  const isClient = useClientSide();
  const [basketValue] = useLocalStorage({
    key: PRODUCTS_IN_BASKET_LS_KEY,
    defaultValue: "",
  });

  if (!isClient) {
    return null;
  }

  return (
    <MainContainer className={s.wrapper}>
      в корзине
      <div className={s[""]}>
        {basketValue && JSON.parse(basketValue).map((id: string) => <div key={id}> id: {id}</div>)}
      </div>
    </MainContainer>
  );
};

export default BasketPageComponent;
