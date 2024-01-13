export type MainFiltersState = {
  filters: {
    maxPrice: number;
    minPrice: number;
    colors: number[];
  };
  isOpen: boolean;
};
