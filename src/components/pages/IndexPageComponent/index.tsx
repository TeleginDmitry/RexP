import InfoBlock from "./_components/InfoBlock";
import ProductsBlock from "./_components/ProductsBlock";
import RexBlock from "./_components/RexBlock";
import TabsBlock from "./_components/TabsBlock";

import MainContainer from "../../ui/MainContainer";

import s from "./IndexPageComponent.module.scss";

const IndexPageComponent = () => (
  <MainContainer className={s.page}>
    <InfoBlock />
    <RexBlock />
    <TabsBlock />
    <ProductsBlock />
  </MainContainer>
);

export default IndexPageComponent;
