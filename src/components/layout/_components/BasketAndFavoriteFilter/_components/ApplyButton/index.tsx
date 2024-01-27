/* eslint-disable react/jsx-no-bind */
import { Button } from "@nextui-org/react";

import type { FilterCartsType, FilterFavoritesType } from "@/src/types/Filter/filter.types";

import s from "./styles.module.scss";

interface Props {
  applyFilters: (filtersData: Partial<FilterCartsType | FilterFavoritesType> | undefined) => void;
  filters: FilterCartsType | FilterFavoritesType;
  toggleOpen: () => void;
  changeSelectedFilter: (filter: string) => void;
  selectedFilter: string;
}

export const ApplyButton = ({ applyFilters, filters, toggleOpen, changeSelectedFilter, selectedFilter }: Props) => {
  const isDisables =
    filters.brands.length === 0 && filters.minPrice === 99 && filters.maxPrice === 3599999 && filters.categoryId === 0;

  function onClick() {
    if (selectedFilter === "") {
      applyFilters(undefined);
      toggleOpen();
    } else {
      changeSelectedFilter("");
    }
  }

  return (
    <Button onClick={onClick} className={s.button} disabled={isDisables}>
      Выбрать
    </Button>
  );
};
