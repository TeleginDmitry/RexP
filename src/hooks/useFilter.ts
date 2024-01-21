import { useState } from "react";

import type { FilterType } from "../types/Filter/filter.types";

export function useFilter() {
  const [filters, setFilters] = useState<FilterType>({
    brands: [],
    colors: [],
    sizes: [],
    maxPrice: 3599999,
    minPrice: 99,
  });
  const [isOpen, setIsOpen] = useState(false);

  function changeFilters(values: FilterType) {
    setFilters((state) => ({ ...state, ...values }));
  }

  function toggleOpen() {
    setIsOpen((state) => !state);
  }

  return { changeFilters, filters, isOpen, toggleOpen };
}
