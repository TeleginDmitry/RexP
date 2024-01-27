/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
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

  function onChangeInputValueLeft(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: newValue } = event.target;

    setValue((state) => [+newValue, state[1]]);

    changeFilters({ minPrice: +newValue, maxPrice: value[1] });

    applyFilters({ minPrice: +newValue, maxPrice: value[1] });
  }

  function onChangeInputValueRight(event: React.ChangeEvent<HTMLInputElement>) {
    const { value: newValue } = event.target;

    setValue((state) => [state[0], +newValue]);

    changeFilters({ minPrice: value[0], maxPrice: +newValue });

    applyFilters({ minPrice: value[0], maxPrice: +newValue });
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
            <label className={clsx(s.from, activeSlider === "left" && s.active, "flex items-center gap-2 w-full")}>
              <span>От</span>
              <input
                onChange={onChangeInputValueLeft}
                defaultValue={value[0]}
                className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={value[0] === 0 ? "" : value[0]}
                max={3599999}
                min={99}
                type="number"
                placeholder={value[0] === 0 ? "" : new Intl.NumberFormat("ru-RU").format(value[0])}
              />
            </label>
            <label className={clsx(s.to, activeSlider === "right" && s.active, "flex items-center gap-2 w-full")}>
              <span>До</span>
              <input
                onChange={onChangeInputValueRight}
                defaultValue={value[1]}
                className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                max={3599999}
                min={99}
                value={value[1] === 0 ? "" : value[1]}
                placeholder={value[1] === 0 ? "" : new Intl.NumberFormat("ru-RU").format(value[1])}
              />
            </label>
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
