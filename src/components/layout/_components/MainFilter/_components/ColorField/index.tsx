/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";

import { CheckboxGroup } from "@nextui-org/react";
import clsx from "clsx";

import all from "@/public/images/colors/all.png";
import RootCheckbox from "@/src/components/ui/RootCheckbox";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import type { FilterType } from "@/src/types/Filter/filter.types";

import s from "./ColorField.module.scss";

interface Props {
  filters: FilterType;
  changeFilters: (values: Partial<FilterType>) => void;
}

const ColorField = ({ changeFilters, filters }: Props) => {
  const colors = useAppSelector((state) => state.colors.data);

  const [mainChecked, setMainChecked] = useState(filters.colors.length === 0);
  const [selected, setSelected] = useState<string[]>(filters.colors);

  function onValueChangeGroup(values: string[]) {
    setSelected(values);
    changeFilters({ colors: values });

    if (values.length === 0) {
      setMainChecked(true);
    } else {
      setMainChecked(false);
    }
  }

  function onValueChangeMain(isSelected: boolean) {
    if (isSelected) {
      setMainChecked(true);
    }

    setSelected([]);
    changeFilters({ colors: [] });
  }

  return (
    <div className={s.wrapper}>
      <RootCheckbox onValueChange={onValueChangeMain} isSelected={mainChecked}>
        <div className={s.colorWrapper}>
          <div className={s.colorAll} style={{ backgroundImage: `url(${all.src})` }} />
          <div className={s.name}>Все цвета</div>
        </div>
      </RootCheckbox>
      <CheckboxGroup value={selected} onValueChange={onValueChangeGroup}>
        {colors.map((color) => (
          <RootCheckbox key={color.id} value={`${color.id}`}>
            <div className={s.colorWrapper}>
              <div
                className={clsx(s.color, ["white", "#FFFFFF", "#fff"].includes(color.colorID) && s.white)}
                style={{ backgroundColor: color.colorID }}
              />
              <div className={s.name}>{color.name}</div>
            </div>
          </RootCheckbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default ColorField;
