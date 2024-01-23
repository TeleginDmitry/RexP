import type { FilterCartsType, FilterFavoritesType, FilterType } from "@/src/types/Filter/filter.types";

export type FilterState = {
  indexPage: FilterType;
  basketPage: FilterCartsType;
  favoritesPage: FilterFavoritesType;
};
