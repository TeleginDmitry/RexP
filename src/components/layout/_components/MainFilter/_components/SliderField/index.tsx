/* eslint-disable react/jsx-no-bind */
import { useState } from "react";

import { Slider } from "@nextui-org/react";
import clsx from "clsx";

import type { FilterType } from "@/src/types/Filter/filter.types";

import s from "../../MainFilter.module.scss";

interface Props {
  filters: FilterType;
  changeFilters: (values: Partial<FilterType>) => void;
  applyFilters: (filtersData: Partial<FilterType> | undefined) => void;
}
const SliderField = ({ changeFilters, filters, applyFilters }: Props) => {
  const { minPrice, maxPrice } = filters;

  const [value, setValue] = useState([minPrice, maxPrice]);
  const [activeSlider, setActiveSlider] = useState<"left" | "right" | undefined>(undefined);

  function onChange(sliderValue: number[]) {
    setValue(sliderValue);

    if (sliderValue[0] !== filters.minPrice) {
      setActiveSlider("left");
    } else {
      setActiveSlider("right");
    }
  }

  function onChangeEnd(sliderValue: number[]) {
    setActiveSlider(undefined);

    changeFilters({ minPrice: sliderValue[0], maxPrice: sliderValue[1] });

    applyFilters({ minPrice: sliderValue[0], maxPrice: sliderValue[1] });
  }

  function resetFIlters() {
    setValue([99, 3599999]);
    changeFilters({
      ...filters,
      maxPrice: 3599999,
      minPrice: 99,
    });
  }

  const isVisibleReset = value[0] !== 99 || value[1] !== 3599999;

  return (
    <div className="flex flex-col gap-[16px] w-full mt-[16px]  items-start justify-center">
      <div className="flex items-center justify-between w-full">
        <span className={s["price-title"]}>Цена</span>
        {isVisibleReset && (
          <button onClick={resetFIlters} className="flex gap-2 items-center text-sm">
            Сбросить
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
              <path d="M10 0.5L5.5 5L10 9.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M1 0.5L5.5 5L1 9.5" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        )}
      </div>
      <div className={s.range}>
        {Array.isArray(value) && (
          <>
            <div className={clsx(s.from, activeSlider === "left" && s.active)}>
              От {new Intl.NumberFormat("ru-RU").format(value[0])}
            </div>
            <div className={clsx(s.to, activeSlider === "right" && s.active)}>
              До {new Intl.NumberFormat("ru-RU").format(value[1])}
            </div>
          </>
        )}
      </div>
      <Slider
        size="sm"
        formatOptions={{ style: "currency", currency: "USD" }}
        step={10}
        maxValue={3599999}
        minValue={99}
        value={value}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        className={s.mainSlider}
      />
    </div>
  );
};

export default SliderField;
