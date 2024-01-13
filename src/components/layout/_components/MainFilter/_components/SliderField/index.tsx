import { useEffect, useState } from "react";

import { Slider } from "@nextui-org/react";

import { useAppDispatch } from "@/src/hooks/redux-hooks/redux-hooks";
import { setMaxPrice, setMinPrice } from "@/src/store/slices/mainFilter";

import s from "../../MainFilter.module.scss";

const SliderField = () => {
  const [value, setValue] = useState([99, 3599999]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMinPrice({ minPrice: value[0] }));
    dispatch(setMaxPrice({ maxPrice: value[1] }));
  }, [dispatch, value]);

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
        onChange={(sliderValue) => setValue(sliderValue as number[])}
        className={s.mainSlider}
      />
    </div>
  );
};

export default SliderField;
