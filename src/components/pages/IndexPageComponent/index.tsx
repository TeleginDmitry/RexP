import InfoBlock from "./_components/InfoBlock";
import RexBlock from "./_components/RexBlock";
import TabsBlock from "./_components/TabsBlock";

import MainContainer from "../../ui/MainContainer";
import ProductCard from "../../ui/ProductCard";

import s from "./IndexPageComponent.module.scss";

const IndexPageComponent = () => (
  <MainContainer className={s.page}>
    <InfoBlock />
    <RexBlock />
    <TabsBlock />
    <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={1} />
    <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={1} liked />
  </MainContainer>
);

export default IndexPageComponent;
