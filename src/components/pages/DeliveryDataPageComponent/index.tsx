import AddButton from "./_components/AddButton";

import MainContainer from "../../ui/MainContainer";

import s from "./DeliveryDataPageComponent.module.scss";

const DeliveryDataPageComponent = () => (
  <MainContainer className={s.wrapper}>
    <AddButton />
  </MainContainer>
);

export default DeliveryDataPageComponent;
