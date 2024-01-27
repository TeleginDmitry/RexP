/* eslint-disable react/jsx-no-bind */
import { useState } from "react";

import Image from "next/image";

import BasketAndFavoriteFilter from "@/src/components/layout/_components/BasketAndFavoriteFilter";
import { Selector } from "@/src/components/ui/Selector/Selector";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { useFilter } from "@/src/hooks/useFilter";
import { addFiltersToFavoritesPage } from "@/src/store/slices/filter";
import { getFavoritesThunk } from "@/src/store/slices/getFavorite/getFavorite/getFavorite";
import type { FilterCartsType } from "@/src/types/Filter/filter.types";

export const FilterBlock = () => {
  const dispatch = useAppDispatch();

  const { isOpen, toggleOpen } = useFilter();

  const filters = useAppSelector((state) => state.filter.favoritesPage);

  const [selectedValue, setSelectedValue] = useState("Сначала новые");

  function changeFilters(newFilters: Partial<FilterCartsType>) {
    dispatch(addFiltersToFavoritesPage(newFilters));
  }

  function applyFilters() {
    const orderBy = selectedValue === "Сначала новые" || selectedValue === "Сначала старые" ? "id" : "price";
    const sortBy = selectedValue === "Сначала дорогие" || selectedValue === "Сначала дешёвые" ? "DESC" : "ASC";

    dispatch(getFavoritesThunk({ ...filters, orderBy, sortBy }));
  }

  function changeSelectedValue({ value }: { id: number; value: string }) {
    setSelectedValue(value);

    const orderBy = value === "Сначала новые" || value === "Сначала старые" ? "id" : "price";
    const sortBy = value === "Сначала дорогие" || value === "Сначала дешёвые" ? "DESC" : "ASC";

    dispatch(getFavoritesThunk({ ...filters, orderBy, sortBy }));
  }

  return (
    <div className="flex items-center justify-between mb-3">
      <Selector
        values={[
          { id: 1, value: "Сначала новые" },
          { id: 2, value: "Сначала старые" },
          { id: 3, value: "Сначала дорогие" },
          { id: 4, value: "Сначала дешёвые" },
        ].filter((value) => value.value !== selectedValue)}
        defaultValue={selectedValue}
        onChange={changeSelectedValue}
      />

      <button onClick={toggleOpen}>
        <Image src="/images/icons/filters.svg" width={25} height={25} alt="filters icon" />
      </button>

      {isOpen && (
        <BasketAndFavoriteFilter
          applyFilters={applyFilters}
          filters={filters}
          changeFilters={changeFilters}
          toggleOpen={toggleOpen}
        />
      )}
    </div>
  );
};
