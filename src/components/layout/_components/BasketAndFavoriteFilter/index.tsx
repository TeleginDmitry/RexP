/* eslint-disable react/jsx-no-bind */
import { useEffect, useState } from "react";

import clsx from "clsx";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import MainContainer from "@/src/components/ui/MainContainer";
import RootButton from "@/src/components/ui/RootButton";
import Portal from "@/src/hocs/Portal";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import type { FilterCartsType, FilterFavoritesType } from "@/src/types/Filter/filter.types";

import { ApplyButton } from "./_components/ApplyButton";
import BrandField from "./_components/BrandField";
import CategoriesField from "./_components/CategoriesField/CategoriesField";
import SliderField from "./_components/SliderField";

import s from "./MainFilter.module.scss";

interface Props {
  filters: FilterCartsType | FilterFavoritesType;
  changeFilters: (values: FilterCartsType | FilterFavoritesType) => void;
  applyFilters: (filtersData: Partial<FilterCartsType | FilterFavoritesType> | undefined) => void;
  toggleOpen: () => void;
}

const BasketAndFavoriteFilter = ({ changeFilters, filters, applyFilters, toggleOpen }: Props) => {
  const brands = useAppSelector((state) => state.brands.data);
  const categories = useAppSelector((state) => state.category.data);

  const [selectedFilter, setSelectedFilter] = useState("");

  const onHandleClick = () => {
    if (selectedFilter) {
      setSelectedFilter("");
      return;
    }
    toggleOpen();
  };

  function changeSelectedFilter(filter: string) {
    setSelectedFilter(filter);
  }

  function resetFIlters() {
    applyFilters({
      brands: [],
      categoryId: 0,
    });
    changeFilters({
      ...filters,
      brands: [],
      categoryId: 0,
    });
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const neededBrands = brands.filter((brand) => filters.brands.includes(String(brand.id))).map((brand) => brand.name);

  const neededCategories = categories
    .filter((category) => filters.categoryId === category.id)
    .map((category) => category.name);

  const isVisibleReset = filters.brands.length !== 0 || filters.categoryId !== 0;

  return (
    <Portal>
      <MainContainer className={s.wrapper}>
        <div className={s.header}>
          <RootButton className={s.link} aria-label="Назад" onClick={onHandleClick}>
            <RootIcon name="arrowLeft" />
          </RootButton>
          <h1 className={s.title}>Фильтры</h1>
          {isVisibleReset && (
            <button onClick={resetFIlters} className="text-red-600 flex gap-2 items-center text-sm">
              Сбросить
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M10 1L5.5 5.5L10 10" stroke="#D50000" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1 1L5.5 5.5L1 10" stroke="#D50000" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          )}
        </div>
        <div className={s.filters}>
          <RootButton className={s.item} onClick={() => setSelectedFilter("categories")}>
            <div className={s.name}>Категории</div>
            <div className={s.sort}>
              {neededCategories.join(", ") || "Все"} {">"}
            </div>
          </RootButton>

          <RootButton className={s.item} onClick={() => setSelectedFilter("brand")}>
            <div className={s.name}>Бренд</div>
            <div className={s.sort}>
              {neededBrands.join(", ") || "Все"} {">"}
            </div>
          </RootButton>
          <div className={clsx(s.subFilter, !!selectedFilter && s.active)}>
            {selectedFilter === "brand" && <BrandField filters={filters} changeFilters={changeFilters} />}
            {selectedFilter === "categories" && <CategoriesField changeFilters={changeFilters} filters={filters} />}
          </div>
          <SliderField applyFilters={applyFilters} changeFilters={changeFilters} filters={filters} />
        </div>
        <ApplyButton
          changeSelectedFilter={changeSelectedFilter}
          selectedFilter={selectedFilter}
          filters={filters}
          toggleOpen={toggleOpen}
          applyFilters={applyFilters}
        />
      </MainContainer>
    </Portal>
  );
};

export default BasketAndFavoriteFilter;
