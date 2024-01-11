import SaveButton from "./_components/SaveButton";
import TabsBlock from "./_components/TabsBlock";

import MainContainer from "../../ui/MainContainer";

import s from "./DeliveryDetailsPageComponent.module.scss";

const DeliveryDetailsPageComponent = () => (
  <MainContainer className={s.wrapper}>
    <TabsBlock />
    <SaveButton />
  </MainContainer>
);

export default DeliveryDetailsPageComponent;
