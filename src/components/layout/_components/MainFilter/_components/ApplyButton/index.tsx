/* eslint-disable react/jsx-no-bind */
import { Button } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { getProductsThunk } from "@/src/store/slices/getProducts/getProducts/getProducts";
import { switchMainFilterOpenState } from "@/src/store/slices/mainFilter";

import s from "./styles.module.scss";

export const ApplyButton = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.products.filters);

  function applyFillters() {
    dispatch(getProductsThunk({ filters }));

    dispatch(switchMainFilterOpenState());
  }

  return (
    <Button onClick={applyFillters} className={s.button}>
      Применить
    </Button>
  );
};
