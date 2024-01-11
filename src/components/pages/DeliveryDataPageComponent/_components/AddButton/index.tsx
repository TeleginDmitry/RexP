import { useEffect, useState } from "react";

import { useLocalStorage } from "@mantine/hooks";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { toast } from "sonner";

import { ADDRESSES_LS_KEY, MAX_ADDRESSES } from "@/src/constants";

import s from "./AddButton.module.scss";

const AddButton = () => {
  const [addressesValue] = useLocalStorage({ key: ADDRESSES_LS_KEY, defaultValue: "" });
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!addressesValue) {
      return;
    }

    const addresses = JSON.parse(addressesValue);
    setLength(addresses.length);
  }, [addressesValue]);

  const onHandleClick = () => {
    if (!length) {
      return;
    }

    if (length >= MAX_ADDRESSES) {
      toast.error(`Максимальное количество адресов: ${MAX_ADDRESSES}`);
    }
  };

  return (
    <Button
      className={clsx(s.button, length >= MAX_ADDRESSES && s.disabled)}
      onClick={onHandleClick}
      disabled={length >= MAX_ADDRESSES}
    >
      Добавить данные доставки
    </Button>
  );
};

export default AddButton;
