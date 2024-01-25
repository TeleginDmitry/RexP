/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from "react";

import clsx from "clsx";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import MainContainer from "@/src/components/ui/MainContainer";
import RootButton from "@/src/components/ui/RootButton";
import Portal from "@/src/hocs/Portal";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import type { FilterType } from "@/src/types/Filter/filter.types";

import { ApplyButton } from "./_components/ApplyButton";
import BrandField from "./_components/BrandField";
import CategoriesField from "./_components/CategoriesField/CategoriesField";
import SizeField from "./_components/SizeField";
import SliderField from "./_components/SliderField";
import SortField from "./_components/SortField/SortField";

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
  const brands = useAppSelector((state) => state.brands.data);
  const sizes = useAppSelector((state) => state.colors.data);
  const categories = useAppSelector((state) => state.category.data);

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

  const neededBrands = brands.filter((brand) => filters.brands.includes(String(brand.id))).map((brand) => brand.name);
  const neededSizes = sizes.filter((size) => filters.sizes.includes(String(size.id))).map((size) => size.name);
  const neededCategories = categories
    .filter((category) => filters.categoryId === category.id)
    .map((category) => category.name);

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
          <RootButton className={s.item} onClick={() => setSelectedFilter("sort")}>
            <div className={s.name}>Сортировка</div>
            <div className={s.sort}>
              {filters.orderBy === "id" && filters.sortBy === "DESC"
                ? "Сначала новые"
                : filters.orderBy === "id" && filters.sortBy === "ASC"
                ? "Сначала старые"
                : filters.orderBy === "price" && filters.sortBy === "DESC"
                ? "Сначала дорогие"
                : "Сначала дешёвые"}
              {">"}
            </div>
          </RootButton>
          {isVisibleCategories && (
            <RootButton className={s.item} onClick={() => setSelectedFilter("categories")}>
              <div className={s.name}>Категории</div>
              <div className={s.sort}>
                {neededCategories.join(", ") || "Все"} {">"}
              </div>
            </RootButton>
          )}

          <RootButton className={s.item} onClick={() => setSelectedFilter("size")}>
            <div className={s.name}>Размер</div>
            <div className={s.sort}>
              {neededSizes.join(", ") || "Все"} {">"}
            </div>
          </RootButton>
          <RootButton className={s.item} onClick={() => setSelectedFilter("brand")}>
            <div className={s.name}>Бренд</div>
            <div className={s.sort}>
              {neededBrands.join(", ") || "Все"} {">"}
            </div>
          </RootButton>
          <div className={clsx(s.subFilter, !!selectedFilter && s.active)}>
            {selectedFilter === "size" && <SizeField filters={filters} changeFilters={changeFilters} />}
            {selectedFilter === "brand" && <BrandField filters={filters} changeFilters={changeFilters} />}
            {selectedFilter === "categories" && <CategoriesField changeFilters={changeFilters} filters={filters} />}
            {selectedFilter === "sort" && <SortField changeFilters={changeFilters} filters={filters} />}
          </div>
          <SliderField changeFilters={changeFilters} filters={filters} />
        </div>
        <ApplyButton filters={filters} applyFilters={applyFilters} />
      </MainContainer>
    </Portal>
  );
};

export default MainFilter;
