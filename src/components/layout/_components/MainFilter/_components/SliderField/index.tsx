/* eslint-disable react/jsx-no-bind */
import { useRef, useState } from "react";

import { Slider } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { addFilters } from "@/src/store/slices/getProducts";

import s from "../../MainFilter.module.scss";

const SliderField = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  const { minPrice, maxPrice } = useAppSelector((state) => state.products.filters);

  const [value, setValue] = useState([minPrice, maxPrice]);

  function onChange(sliderValue: number[]) {
    setValue(sliderValue);

    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      dispatch(addFilters({ minPrice: value[0], maxPrice: value[1] }));
    }, 250);
  }

  return (
    <div className="flex flex-col gap-[16px] w-full mt-[16px]  items-start justify-center">
      <div className={s["price-title"]}>Цена</div>
      <div className={s.range}>
        {Array.isArray(value) && (
          <>
            <div className={s.from}>От {new Intl.NumberFormat("ru-RU").format(value[0])}</div>
            <div className={s.to}>До {new Intl.NumberFormat("ru-RU").format(value[1])}</div>
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
        className={s.mainSlider}
      />
    </div>
  );
};

export default SliderField;
