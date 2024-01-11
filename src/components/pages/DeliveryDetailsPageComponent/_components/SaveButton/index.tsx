import { Button } from "@nextui-org/react";

import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { generateId } from "@/src/utils/generateId";

import s from "./SaveButton.module.scss";

const SaveButton = () => {
  const delivery = useAppSelector((state) => state.delivery);
  const id = generateId();

  return <Button className={s.button}>Сохранить данные доставки</Button>;
};

export default SaveButton;
