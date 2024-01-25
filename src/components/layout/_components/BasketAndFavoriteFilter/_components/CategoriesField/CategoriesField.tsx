/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";

import clsx from "clsx";

import RootCheckbox from "@/src/components/ui/RootCheckbox";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import type { FilterCartsType, FilterFavoritesType } from "@/src/types/Filter/filter.types";

import s from "./CategoriesField.module.scss";

interface Props {
  filters: FilterCartsType | FilterFavoritesType;
  changeFilters: (values: Partial<FilterCartsType | FilterFavoritesType>) => void;
}

const CategoriesField = ({ changeFilters, filters }: Props) => {
  const categories = useAppSelector((state) => state.category.data);

  const [selectedCheckbox, setSelectedCheckbox] = useState<number>(filters.categoryId ?? 0);

  const handleCheckboxChange = (category: number) => {
    if (category === 0) {
      changeFilters({ categoryId: undefined });
    }

    setSelectedCheckbox(category);

    changeFilters({ categoryId: category });
  };

  return (
    <div className={s.wrapper}>
      <RootCheckbox value="0" isSelected={selectedCheckbox === 0} onChange={() => handleCheckboxChange(0)}>
        <div className={s.categoryWrapper}>
          <div className={s.categoryAll} />
          <div className={s.name}>Все категории</div>
        </div>
      </RootCheckbox>
      {categories.map((category) => (
        <RootCheckbox
          key={category.id}
          isSelected={selectedCheckbox === category.id}
          onChange={() => handleCheckboxChange(category.id)}
          value={`${category.id}`}
        >
          <div className={s.categoryWrapper}>
            <div className={clsx(s.category)} />
            <div className={s.name}>{category.name}</div>
          </div>
        </RootCheckbox>
      ))}
    </div>
  );
};

export default CategoriesField;
