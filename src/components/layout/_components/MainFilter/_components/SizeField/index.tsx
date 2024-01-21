/* eslint-disable react/jsx-no-bind */
import { useState } from "react";

import { CheckboxGroup } from "@nextui-org/react";

import RootCheckbox from "@/src/components/ui/RootCheckbox";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { addFilters } from "@/src/store/slices/getProducts";

import s from "./ColorField.module.scss";

const SizeField = () => {
  const dispatch = useAppDispatch();
  const selectedSizes = useAppSelector((state) => state.products.filters.sizes);
  const sizes = useAppSelector((state) => state.sizes.data);

  const [mainChecked, setMainChecked] = useState(selectedSizes.length === 0);
  const [selected, setSelected] = useState<string[]>(selectedSizes);

  function onValueChangeGroup(values: string[]) {
    setSelected(values);
    dispatch(addFilters({ sizes: values }));

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
    dispatch(addFilters({ sizes: [] }));
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
