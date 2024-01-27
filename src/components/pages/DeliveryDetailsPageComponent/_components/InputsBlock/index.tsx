/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import PhoneInput from "react-phone-input-2";

import type { DeliveryState } from "@/src/store/slices/delivery/types";

import { PVZ_ADDRESS } from "../../pvz-address";
import { RUSSIAN_CITIES } from "../../russian-cities";

import s from "./InputsBlock.module.scss";

import "react-phone-input-2/lib/material.css";
import type { Delivery } from "@/src/types/delivery.types";

import { useRouter } from "next/router";

interface Props {
  currentAddress: Delivery;
  onHandleChange: (value: string, name: keyof DeliveryState) => void;
  activeTab: "Курьером" | "Пункт выдачи заказа";
}

const InputsBlock = ({ currentAddress, onHandleChange, activeTab }: Props) => {
  const router = useRouter();

  const idParam = router.pathname.includes("id");

  const defaultCity = idParam
    ? RUSSIAN_CITIES.find((city) => city.name.toLowerCase().includes(currentAddress.city?.toLowerCase() ?? ""))
    : undefined;

  const defaultPvzAdress = idParam
    ? PVZ_ADDRESS.find((address) => address.name.toLowerCase().includes(currentAddress.pvzAddress?.toLowerCase() ?? ""))
    : undefined;

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Адрес</div>
      <div className={s.inputs}>
        <Autocomplete
          allowsCustomValue
          label="Город"
          variant="bordered"
          classNames={{ base: s.base, popoverContent: s.popoverContent, listbox: s.listbox }}
          onValueChange={(value) => onHandleChange(value, "city")}
          defaultItems={RUSSIAN_CITIES}
          defaultSelectedKey={`${defaultCity?.name}_${defaultCity?.population}`}
        >
          {(item) => (
            <AutocompleteItem key={`${item.name}_${item.population}`} className={s.item}>
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
        {activeTab === "Пункт выдачи заказа" && (
          <Autocomplete
            allowsCustomValue
            label="Адрес ПВЗ СДЕК"
            variant="bordered"
            classNames={{ base: s.base, popoverContent: s.popoverContent, listbox: s.listbox }}
            onValueChange={(value) => onHandleChange(value, "pvzAddress")}
            defaultItems={PVZ_ADDRESS}
            defaultSelectedKey={defaultPvzAdress?.name}
          >
            {(item) => (
              <AutocompleteItem key={`${item.name}`} className={s.item}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
        {activeTab === "Курьером" && (
          <>
            <Input
              type="text"
              label="Улица"
              value={currentAddress.street ?? ""}
              className={s.inputUi}
              onChange={(e) => onHandleChange(e.target.value, "street")}
            />
            <div className={s.inputs_row}>
              <Input
                type="text"
                label="Дом"
                className={s.inputUi}
                onChange={(e) => onHandleChange(e.target.value, "house")}
              />
              <Input
                type="text"
                label="Квартира"
                value={currentAddress.flat ?? ""}
                className={s.inputUi}
                onChange={(e) => onHandleChange(e.target.value, "flat")}
              />
            </div>
          </>
        )}
      </div>
      <div className={s.title}>Получатель</div>
      <div className={s.inputs}>
        <Input
          type="text"
          label="Фамилия"
          value={currentAddress.lastName ?? ""}
          className={s.inputUi}
          onChange={(e) => onHandleChange(e.target.value, "lastName")}
        />
        <Input
          type="text"
          label="Имя"
          value={currentAddress.firstName ?? ""}
          className={s.inputUi}
          onChange={(e) => onHandleChange(e.target.value, "firstName")}
        />
        <Input
          type="text"
          label="Отчество"
          value={currentAddress.patronymic ?? ""}
          className={s.inputUi}
          onChange={(e) => onHandleChange(e.target.value, "patronymic")}
        />
        <PhoneInput
          country="ru"
          placeholder="+7 (999) 999-99-99"
          disableCountryGuess
          value={currentAddress.number ?? ""}
          onChange={(e) => onHandleChange(e, "number")}
          inputClass={s.phoneInput__input}
          containerClass={s.phoneInput__container}
        />
      </div>
    </div>
  );
};

export default InputsBlock;
