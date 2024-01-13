import React, { useEffect, useState } from "react";

import { CheckboxGroup } from "@nextui-org/react";
import clsx from "clsx";

import all from "@/public/images/colors/all.png";
import RootCheckbox from "@/src/components/ui/RootCheckbox";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import s from "./ColorField.module.scss";

const ColorField = () => {
  const [mainChecked, setMainChecked] = useState(false);
  const [selected, setSelected] = useState<string[]>([""]);
  const colors = useAppSelector((state) => state.colors.data);

  console.log(colors);

  useEffect(() => {
    if (mainChecked) {
      setSelected([""]);
    }
  }, [mainChecked]);

  useEffect(() => {
		console.log(selected)
    if (selected.length > 1) {
      setMainChecked(false);
    }
  }, [selected]);

  return (
    <div className={s.wrapper}>
      <RootCheckbox onValueChange={setMainChecked} isSelected={mainChecked}>
        <div className={s.colorWrapper}>
          <div className={s.colorAll} style={{ backgroundImage: `url(${all.src})` }} />
          <div className={s.name}>Все цвета</div>
        </div>
      </RootCheckbox>
      <CheckboxGroup value={selected} onValueChange={setSelected}>
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
