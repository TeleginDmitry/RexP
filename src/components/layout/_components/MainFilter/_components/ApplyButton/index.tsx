/* eslint-disable react/jsx-no-bind */
import { Button } from "@nextui-org/react";

import type { FilterType } from "@/src/types/Filter/filter.types";

import s from "./styles.module.scss";

interface Props {
  applyFilters: () => void;
  filters: FilterType;
}

export const ApplyButton = ({ applyFilters, filters }: Props) => {
  const isDisables =
    filters.brands.length === 0 &&
    filters.sizes.length === 0 &&
    filters.minPrice === 99 &&
    filters.maxPrice === 3599999 &&
    filters.orderBy === "id" &&
    filters.sortBy === "DESC";

  console.log(filters);

  return (
    <Button onClick={applyFilters} className={s.button} disabled={isDisables}>
      Применить
    </Button>
  );
};
