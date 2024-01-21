import { useRef } from "react";

import Image from "next/image";

import { useAppDispatch } from "@/src/hooks/redux-hooks/redux-hooks";
import { addFilters } from "@/src/store/slices/getProducts";
import { getProductsThunk } from "@/src/store/slices/getProducts/getProducts/getProducts";
import { setMainFilterOpenState } from "@/src/store/slices/mainFilter";

import styles from "./styles.module.scss";

export const SearhBlock = () => {
  const dispatch = useAppDispatch();

  const timeout = useRef<NodeJS.Timeout | null>(null);

  function handleInput(event: React.ChangeEvent) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      const { value } = event.target as HTMLInputElement;

      dispatch(addFilters({ name: value }));
      dispatch(getProductsThunk({ filters: { name: value } }));
    }, 500);
  }

  function openFilters() {
    dispatch(setMainFilterOpenState({ isOpen: true }));
  }

  return (
    <div className={styles.wrapper}>
      <button>
        <Image src="/images/icons/search.svg" width={21} height={21} alt="search icon" />
      </button>
      <input onChange={handleInput} type="text" placeholder="Поиск по названию" className={styles.input} />
      <button onClick={openFilters}>
        <Image src="/images/icons/filters.svg" width={25} height={25} alt="filters icon" />
      </button>
    </div>
  );
};
