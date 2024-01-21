/* eslint-disable react/jsx-no-bind */
import { useState } from "react";

import { useDebouncedValue } from "@mantine/hooks";
import { CheckboxGroup } from "@nextui-org/react";

import RootCheckbox from "@/src/components/ui/RootCheckbox";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { addFilters } from "@/src/store/slices/getProducts";

import s from "./BrandField.module.scss";

const BrandField = () => {
  const dispatch = useAppDispatch();
  const selectedBrands = useAppSelector((state) => state.products.filters.brands);
  const brands = useAppSelector((state) => state.brands.data);

  const [mainChecked, setMainChecked] = useState(selectedBrands.length === 0);
  const [selected, setSelected] = useState<string[]>(selectedBrands);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 240);

  function onValueChangeGroup(values: string[]) {
    setSelected(values);
    dispatch(addFilters({ brands: values }));

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
    dispatch(addFilters({ brands: [] }));
  }

  return (
    <div className={s.wrapper}>
      <div className={s["input-wrapper"]}>
        <div className={s.icon}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.29248 11.5098C7.97868 11.5098 8.62337 11.3797 9.22656 11.1196C9.82975 10.854 10.361 10.4915 10.8203 10.0322C11.2796 9.57292 11.6393 9.04167 11.8994 8.43848C12.165 7.83529 12.2979 7.19059 12.2979 6.50439C12.2979 5.8182 12.165 5.1735 11.8994 4.57031C11.6393 3.96712 11.2796 3.43587 10.8203 2.97656C10.361 2.51172 9.82975 2.14925 9.22656 1.88916C8.62337 1.62907 7.97868 1.49902 7.29248 1.49902C6.60628 1.49902 5.96159 1.62907 5.3584 1.88916C4.75521 2.14925 4.22119 2.51172 3.75635 2.97656C3.29704 3.43587 2.93734 3.96712 2.67725 4.57031C2.41715 5.1735 2.28711 5.8182 2.28711 6.50439C2.28711 7.19059 2.41715 7.83529 2.67725 8.43848C2.93734 9.04167 3.29704 9.57292 3.75635 10.0322C4.22119 10.4915 4.75521 10.854 5.3584 11.1196C5.96159 11.3797 6.60628 11.5098 7.29248 11.5098ZM7.29248 12.8877C6.4126 12.8877 5.58805 12.7217 4.81885 12.3896C4.04964 12.0576 3.37174 11.5983 2.78516 11.0117C2.19857 10.4251 1.73926 9.74723 1.40723 8.97803C1.0752 8.20882 0.90918 7.38428 0.90918 6.50439C0.90918 5.62451 1.0752 4.79997 1.40723 4.03076C1.73926 3.25602 2.19857 2.57812 2.78516 1.99707C3.37174 1.41048 4.04964 0.951172 4.81885 0.619141C5.59359 0.287109 6.41813 0.121094 7.29248 0.121094C8.17236 0.121094 8.99691 0.287109 9.76611 0.619141C10.5353 0.951172 11.2132 1.41048 11.7998 1.99707C12.3864 2.58366 12.8457 3.26156 13.1777 4.03076C13.5098 4.79997 13.6758 5.62451 13.6758 6.50439C13.6758 7.38428 13.5098 8.20882 13.1777 8.97803C12.8457 9.74723 12.3864 10.4251 11.7998 11.0117C11.2132 11.5983 10.5353 12.0576 9.76611 12.3896C8.99691 12.7217 8.17236 12.8877 7.29248 12.8877ZM15.6182 15.9009C15.4909 15.9009 15.3691 15.8787 15.2529 15.8345C15.1367 15.7902 15.0316 15.721 14.9375 15.627L10.5298 11.2109L11.8911 9.89941L16.2739 14.2905C16.368 14.3791 16.4344 14.4814 16.4731 14.5977C16.5174 14.7139 16.5396 14.8328 16.5396 14.9546C16.5396 15.1317 16.498 15.2894 16.415 15.4277C16.3376 15.5716 16.2297 15.6851 16.0913 15.7681C15.953 15.8566 15.7952 15.9009 15.6182 15.9009Z"
              fill="#3C3C43"
              fill-opacity="0.6"
            />
          </svg>
        </div>
        <input
          placeholder="Какой бренд ищем?"
          type="text"
          className={s.input}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <RootCheckbox onValueChange={onValueChangeMain} isSelected={mainChecked}>
        <div className={s.name}>Все бренды</div>
      </RootCheckbox>
      <CheckboxGroup value={selected} onValueChange={onValueChangeGroup} className={s.checkboxGroup}>
        {brands
          .filter((brand) => brand.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
          .map((brand) => (
            <RootCheckbox key={brand.id} value={`${brand.id}`}>
              <div className={s.name}>{brand.name}</div>
            </RootCheckbox>
          ))}
      </CheckboxGroup>
    </div>
  );
};

export default BrandField;
