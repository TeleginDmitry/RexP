import RexBlock from "./_components/RexBlock";
import TabsBlock from "./_components/TabsBlock";

import MainContainer from "../../ui/MainContainer";

import s from "./IndexPageComponent.module.scss";

const IndexPageComponent = () => (
  <MainContainer className={s.page}>
    <RexBlock />
    <TabsBlock />
  </MainContainer>
);

export default IndexPageComponent;
