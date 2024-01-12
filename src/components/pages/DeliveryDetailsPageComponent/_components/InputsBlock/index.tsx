import { useEffect, useState } from "react";

import { useLocalStorage } from "@mantine/hooks";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";

import { ADDRESSES_LS_KEY } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { setDeliveryData } from "@/src/store/slices/delivery";
import type { DeliveryState } from "@/src/store/slices/delivery/types";

import { PVZ_ADDRESS } from "../../pvz-address";
import { RUSSIAN_CITIES } from "../../russian-cities";

import s from "./InputsBlock.module.scss";

import "react-phone-input-2/lib/material.css";

const InputsBlock = () => {
  const activeFilter = useAppSelector((state) => state.filters.deliveryDetailsPage.activeFilter);
  const [addressesValue] = useLocalStorage({ key: ADDRESSES_LS_KEY, defaultValue: "" });
  const dispatch = useAppDispatch();
  const [selectValue, setSelectValue] = useState("");
  const [selectPVZValue, setSelectPVZValue] = useState("");
  const delivery = useAppSelector((state) => state.delivery);
  const router = useRouter();
  const [currentAddress, setCurrentAddress] = useState<DeliveryState | null>(null);

  useEffect(() => {
    if (router.query.id && addressesValue) {
      const addresses = JSON.parse(addressesValue);
      const currentAddressValue = addresses.find((address) => address.id === router.query.id);
      setCurrentAddress(currentAddressValue as DeliveryState);
    }
  }, [router.query, addressesValue]);

  useEffect(() => {
    if (currentAddress) {
      Object.keys(currentAddress).forEach((key) => {
        dispatch(
          setDeliveryData({ value: currentAddress[key as keyof DeliveryState]!, name: key as keyof DeliveryState })
        );
      });
    }
  }, [currentAddress, dispatch]);

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
        {activeFilter === "Пункт выдачи заказа" && (
          <Autocomplete
            allowsCustomValue
            label="Адрес ПВЗ СДЕК"
            variant="bordered"
            classNames={{ base: s.base, popoverContent: s.popoverContent, listbox: s.listbox }}
            onValueChange={setSelectPVZValue}
            onSelectionChange={(value) => {
              onHandleChange(value ? (value as string).split("_")[0] : "", "pvzAddress");
              if (!value) {
                setSelectPVZValue("");
              }
            }}
            defaultItems={PVZ_ADDRESS.filter((city) =>
              city.name.toLowerCase().includes(selectPVZValue.toLowerCase())
            ).slice(0, 20)}
          >
            {(item) => (
              <AutocompleteItem key={`${item.name}`} className={s.item}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
        {activeFilter === "Курьером" && (
          <>
            <Input
              type="text"
              label="Улица"
              value={delivery.street}
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
                value={delivery.flat}
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
          value={delivery.surname}
          className={s.inputUi}
          onChange={(e) => onHandleChange(e.target.value, "surname")}
        />
        <Input
          type="text"
          label="Имя"
          value={delivery.name}
          className={s.inputUi}
          onChange={(e) => onHandleChange(e.target.value, "name")}
        />
        <Input
          type="text"
          label="Отчество"
          value={delivery.patronymic}
          className={s.inputUi}
          onChange={(e) => onHandleChange(e.target.value, "patronymic")}
        />
        <PhoneInput
          country="ru"
          placeholder="+7 (999) 999-99-99"
          disableCountryGuess
          value={delivery.phone}
          onChange={(e) => onHandleChange(e, "phone")}
          inputClass={s.phoneInput__input}
          containerClass={s.phoneInput__container}
        />
      </div>
    </div>
  );
};

export default InputsBlock;
