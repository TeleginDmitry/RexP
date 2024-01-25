/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";

import RootCheckbox from "@/src/components/ui/RootCheckbox";
import type { FilterType } from "@/src/types/Filter/filter.types";

import s from "./SortField.module.scss";

interface Props {
  filters: FilterType;
  changeFilters: (values: Partial<FilterType>) => void;
}

const SortField = ({ changeFilters, filters }: Props) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(`${filters.orderBy},${filters.sortBy}`);

  const handleCheckboxChange = (category: string) => {
    if (category === "id,DESC") {
      changeFilters({ orderBy: "id", sortBy: "DESC" });
    } else if (category === "id,ASC") {
      changeFilters({ orderBy: "id", sortBy: "ASC" });
    } else if (category === "price,DESC") {
      changeFilters({ orderBy: "price", sortBy: "DESC" });
    } else if (category === "price,ASC") {
      changeFilters({ orderBy: "price", sortBy: "ASC" });
    }

    setSelectedCheckbox(category);
  };

  return (
    <div className={s.wrapper}>
      <RootCheckbox
        value="id,DESC"
        isSelected={selectedCheckbox === "id,DESC"}
        onChange={() => handleCheckboxChange("id,DESC")}
      >
        <div className={s.categoryWrapper}>
          <div className={s.categoryAll} />
          <div className={s.name}>Сначала новые</div>
        </div>
      </RootCheckbox>
      <RootCheckbox
        value="id,ASC"
        isSelected={selectedCheckbox === "id,ASC"}
        onChange={() => handleCheckboxChange("id,ASC")}
      >
        <div className={s.categoryWrapper}>
          <div className={s.categoryAll} />
          <div className={s.name}>Сначала старые</div>
        </div>
      </RootCheckbox>
      <RootCheckbox
        value="price,DESC"
        isSelected={selectedCheckbox === "price,DESC"}
        onChange={() => handleCheckboxChange("price,DESC")}
      >
        <div className={s.categoryWrapper}>
          <div className={s.categoryAll} />
          <div className={s.name}>Сначала дорогие</div>
        </div>
      </RootCheckbox>
      <RootCheckbox
        value="price,ASC"
        isSelected={selectedCheckbox === "price,ASC"}
        onChange={() => handleCheckboxChange("price,ASC")}
      >
        <div className={s.categoryWrapper}>
          <div className={s.categoryAll} />
          <div className={s.name}>Сначала дешёвые</div>
        </div>
      </RootCheckbox>
    </div>
  );
};

export default SortField;
