/* eslint-disable react/jsx-no-bind */
import { Button } from "@nextui-org/react";

import type { FilterType } from "@/src/types/Filter/filter.types";

import s from "./styles.module.scss";

interface Props {
  applyFilters: () => void;
  filters: FilterType;
}

export const ApplyButton = ({ applyFilters, filters }: Props) => (
  <Button onClick={applyFilters} className={s.button}>
    Применить
  </Button>
);
