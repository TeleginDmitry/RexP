import ProductsBlock from "./_components/ProductsBlock";

import MainContainer from "../../ui/MainContainer";

import s from "./BasketPageComponent.module.scss";

const BasketPageComponent = () => (
  <MainContainer className={s.wrapper}>
    <ProductsBlock />
  </MainContainer>
);

export default BasketPageComponent;
