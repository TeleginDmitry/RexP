/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from "react";

import clsx from "clsx";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import MainContainer from "@/src/components/ui/MainContainer";
import RootButton from "@/src/components/ui/RootButton";
import Portal from "@/src/hocs/Portal";
import type { FilterCartsType, FilterFavoritesType } from "@/src/types/Filter/filter.types";

import { ApplyButton } from "./_components/ApplyButton";
import BrandField from "./_components/BrandField";
import CategoriesField from "./_components/CategoriesField/CategoriesField";
import SliderField from "./_components/SliderField";

import s from "./MainFilter.module.scss";

interface Props {
  filters: FilterCartsType | FilterFavoritesType;
  changeFilters: (values: FilterCartsType | FilterFavoritesType) => void;
  applyFilters: () => void;
  toggleOpen: () => void;
}

const BasketAndFavoriteFilter = ({ changeFilters, filters, applyFilters, toggleOpen }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const onHandleClick = () => {
    if (selectedFilter) {
      setSelectedFilter("");
      return;
    }
    toggleOpen();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Portal>
      <MainContainer className={s.wrapper}>
        <div className={s.header}>
          <RootButton className={s.link} aria-label="Назад" onClick={onHandleClick}>
            <RootIcon name="arrowLeft" />
          </RootButton>
          <h1 className={s.title}>Фильтры</h1>
        </div>
        <div className={s.filters}>
          <RootButton className={s.item} onClick={() => setSelectedFilter("categories")}>
            <div className={s.name}>Категории</div>
            <div className={s.sort}>Все {">"}</div>
          </RootButton>

          <RootButton className={s.item} onClick={() => setSelectedFilter("brand")}>
            <div className={s.name}>Бренд</div>
            <div className={s.sort}>Все {">"}</div>
          </RootButton>
          <div className={clsx(s.subFilter, !!selectedFilter && s.active)}>
            {selectedFilter === "brand" && <BrandField filters={filters} changeFilters={changeFilters} />}
            {selectedFilter === "categories" && <CategoriesField changeFilters={changeFilters} filters={filters} />}
          </div>
          <SliderField changeFilters={changeFilters} filters={filters} />
        </div>
        <ApplyButton applyFilters={applyFilters} />
      </MainContainer>
    </Portal>
  );
};

export default BasketAndFavoriteFilter;
