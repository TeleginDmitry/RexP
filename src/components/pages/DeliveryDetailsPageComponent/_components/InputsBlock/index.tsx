import { useState } from "react";

import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import PhoneInput from "react-phone-input-2";

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { setDeliveryData } from "@/src/store/slices/delivery";
import type { DeliveryState } from "@/src/store/slices/delivery/types";

import { RUSSIAN_CITIES } from "../../russian-cities";

import s from "./InputsBlock.module.scss";

import "react-phone-input-2/lib/material.css";

const InputsBlock = () => {
  const activeFilter = useAppSelector((state) => state.filters.deliveryDetailsPage.activeFilter);
  const dispatch = useAppDispatch();
  const [selectValue, setSelectValue] = useState("");

  const onHandleChange = (value: string, name: keyof DeliveryState) => dispatch(setDeliveryData({ value, name }));

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Адрес</div>
      <div className={s.inputs}>
        <Autocomplete
          allowsCustomValue
          label="Город"
          variant="bordered"
          classNames={{ base: s.base, popoverContent: s.popoverContent, listbox: s.listbox }}
          onValueChange={setSelectValue}
          onSelectionChange={(value) => {
            onHandleChange(value ? (value as string).split("_")[0] : "", "city");
            if (!value) {
              setSelectValue("");
            }
          }}
          defaultItems={RUSSIAN_CITIES.filter((city) =>
            city.name.toLowerCase().includes(selectValue.toLowerCase())
          ).slice(0, 20)}
        >
          {(item) => (
            <AutocompleteItem key={`${item.name}_${item.population}`} className={s.item}>
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
        {activeFilter === "Курьером" && (
          <>
            <Input
              type="text"
              label="Улица"
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
          className={s.inputUi}
          onChange={(e) => onHandleChange(e.target.value, "surname")}
        />
        <Input type="text" label="Имя" className={s.inputUi} onChange={(e) => onHandleChange(e.target.value, "name")} />
        <Input
          type="text"
          label="Отчество"
          className={s.inputUi}
          onChange={(e) => onHandleChange(e.target.value, "patronymic")}
        />
        <PhoneInput
          country="ru"
          placeholder="+7 (999) 999-99-99"
          disableCountryGuess
          onChange={(e) => onHandleChange(e, "phone")}
          inputClass={s.phoneInput__input}
          containerClass={s.phoneInput__container}
        />
      </div>
    </div>
  );
};

export default InputsBlock;
