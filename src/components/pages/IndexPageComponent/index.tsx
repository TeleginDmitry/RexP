import { Button } from "@nextui-org/react";
import MainContainer from "../../ui/MainContainer";

import s from "./IndexPageComponent.module.scss";

const IndexPageComponent = () => (
  <MainContainer className={s.page}>
    <Button>Press me</Button>
  </MainContainer>
);

export default IndexPageComponent;
