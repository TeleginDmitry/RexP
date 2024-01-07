import UserInfo from "./_components/UserInfo";

import MainContainer from "../../ui/MainContainer";

import s from "./ProfilePageComponent.module.scss";

const ProfilePageComponent = () => (
  <MainContainer className={s.wrapper}>
    <UserInfo />
  </MainContainer>
);

export default ProfilePageComponent;
