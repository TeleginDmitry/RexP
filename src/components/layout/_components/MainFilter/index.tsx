/* eslint-disable react/jsx-no-bind */
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import clsx from "clsx";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import MainContainer from "@/src/components/ui/MainContainer";
import RootButton from "@/src/components/ui/RootButton";
import Portal from "@/src/hocs/Portal";
import type { FilterType } from "@/src/types/Filter/filter.types";

import { ApplyButton } from "./_components/ApplyButton";
import BrandField from "./_components/BrandField";
import CategoriesField from "./_components/CategoriesField/CategoriesField";
import ColorField from "./_components/ColorField";
import SizeField from "./_components/SizeField";
import SliderField from "./_components/SliderField";

import s from "./MainFilter.module.scss";

interface Props {
  filters: FilterType;
  changeFilters: (values: FilterType) => void;
  applyFilters: () => void;
  toggleOpen: () => void;
  isVisibleCategories?: boolean;
  isOnlyCategories?: boolean;
}

const MainFilter = ({
  changeFilters,
  filters,
  applyFilters,
  toggleOpen,
  isVisibleCategories = false,
  isOnlyCategories = false,
}: Props) => {
  const [selectedFilter, setSelectedFilter] = useState(isOnlyCategories ? "categories" : "");

  const onHandleClick = () => {
    if (isOnlyCategories) {
      toggleOpen();
      return;
    }

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
          {isVisibleCategories && (
            <RootButton className={s.item} onClick={() => setSelectedFilter("categories")}>
              <div className={s.name}>Категории</div>
              <div className={s.sort}>Все {">"}</div>
            </RootButton>
          )}
          <RootButton className={s.item} onClick={() => setSelectedFilter("color")}>
            <div className={s.name}>Цвет</div>
            <div className={s.sort}>Все {">"}</div>
          </RootButton>
          <RootButton className={s.item} onClick={() => setSelectedFilter("size")}>
            <div className={s.name}>Размер</div>
            <div className={s.sort}>Все {">"}</div>
          </RootButton>
          <RootButton className={s.item} onClick={() => setSelectedFilter("brand")}>
            <div className={s.name}>Бренд</div>
            <div className={s.sort}>Все {">"}</div>
          </RootButton>
          <div className={clsx(s.subFilter, !!selectedFilter && s.active)}>
            {selectedFilter === "color" && <ColorField filters={filters} changeFilters={changeFilters} />}
            {selectedFilter === "size" && <SizeField filters={filters} changeFilters={changeFilters} />}
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

export default MainFilter;
