/* eslint-disable react/jsx-no-bind */
import { useState } from "react";

import { CheckboxGroup } from "@nextui-org/react";

import RootCheckbox from "@/src/components/ui/RootCheckbox";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import type { FilterType } from "@/src/types/Filter/filter.types";

import s from "./ColorField.module.scss";

interface Props {
  filters: FilterType;
  changeFilters: (values: Partial<FilterType>) => void;
}

const SizeField = ({ changeFilters, filters }: Props) => {
  const sizes = useAppSelector((state) => state.sizes.data);

  const [mainChecked, setMainChecked] = useState(filters.sizes.length === 0);
  const [selected, setSelected] = useState<string[]>(filters.sizes);

  function onValueChangeGroup(values: string[]) {
    setSelected(values);
    changeFilters({ sizes: values });

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
    changeFilters({ sizes: [] });
  }

  return (
    <div className={s.wrapper}>
      <RootCheckbox onValueChange={onValueChangeMain} isSelected={mainChecked}>
        <div className={s.name}>Все размеры</div>
      </RootCheckbox>
      <CheckboxGroup value={selected} onValueChange={onValueChangeGroup}>
        {sizes.map((size) => (
          <RootCheckbox key={size.id} value={`${size.id}`}>
            <div className={s.name}>{size.name}</div>
          </RootCheckbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default SizeField;
