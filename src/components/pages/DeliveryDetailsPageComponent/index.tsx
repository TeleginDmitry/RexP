/* eslint-disable react/jsx-no-bind */
// import InputsBlock from "./_components/InputsBlock";
import { useState } from "react";

import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import type { DeliveryState } from "@/src/store/slices/delivery/types";

import InputsBlock from "./_components/InputsBlock";
import SaveButton from "./_components/SaveButton";
import TabsBlock from "./_components/TabsBlock";

import { HeaderTitle } from "../../ui/HeaderTitle/HeaderTitle";
import MainContainer from "../../ui/MainContainer";

import s from "./DeliveryDetailsPageComponent.module.scss";

const DeliveryDetailsPageComponent = () => {
  const initialAddres = useAppSelector((state) => state.deliveryOne);

  const [currentAddress, setCurrentAddress] = useState<DeliveryState>(initialAddres);
  const [activeTab, setActiveTab] = useState<"Курьером" | "Пункт выдачи заказа">("Пункт выдачи заказа");

  const onHandleChange = (value: string, name: keyof DeliveryState) => {
    setCurrentAddress((state) => ({
      ...state,
      [name]: value,
    }));
  };

  function changeActiveTab(tab: "Курьером" | "Пункт выдачи заказа") {
    setActiveTab(tab);
  }

  return (
    <MainContainer className={s.wrapper}>
      <HeaderTitle title="Данные доставки" />
      <TabsBlock changeActiveTab={changeActiveTab} activeTab={activeTab} />
      <InputsBlock activeTab={activeTab} currentAddress={currentAddress} onHandleChange={onHandleChange} />
      <SaveButton currentAddress={currentAddress} />
    </MainContainer>
  );
};

export default DeliveryDetailsPageComponent;
