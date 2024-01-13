import { useState, useEffect } from "react";

import { CheckboxGroup } from "@nextui-org/react";

import RootCheckbox from "@/src/components/ui/RootCheckbox";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import s from "./ColorField.module.scss";

const SizeField = () => {
  const [mainChecked, setMainChecked] = useState(false);
  const [selected, setSelected] = useState<string[]>([""]);
  const sizes = useAppSelector((state) => state.sizes.data);

  useEffect(() => {
    if (mainChecked) {
      setSelected([""]);
    }
  }, [mainChecked]);

  useEffect(() => {
    if (selected.length > 1) {
      setMainChecked(false);
    }
  }, [selected]);

  return (
    <div className={s.wrapper}>
      <RootCheckbox onValueChange={setMainChecked} isSelected={mainChecked}>
        <div className={s.name}>Все размеры</div>
      </RootCheckbox>
      <CheckboxGroup value={selected} onValueChange={setSelected}>
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
