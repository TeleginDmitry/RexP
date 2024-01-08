import HistoryProducts from "./_components/HistoryProducts";
import InfoTabs from "./_components/InfoTabs";
import UserInfo from "./_components/UserInfo";

import DefaultLink from "../../ui/links/DefaultLink";
import MainContainer from "../../ui/MainContainer";

import s from "./ProfilePageComponent.module.scss";

const ProfilePageComponent = () => (
  <MainContainer className={s.wrapper}>
    <UserInfo />
    <InfoTabs />
    <HistoryProducts />
    <DefaultLink className={s.info} href="/">
      Юридическая информация
    </DefaultLink>
  </MainContainer>
);

export default ProfilePageComponent;
