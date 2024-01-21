/* eslint-disable react/jsx-no-bind */
import { Button } from "@nextui-org/react";

import s from "./styles.module.scss";

interface Props {
  applyFilters: () => void;
}

export const ApplyButton = ({ applyFilters }: Props) => (
  <Button onClick={applyFilters} className={s.button}>
    Применить
  </Button>
);
