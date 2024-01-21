export type MainFiltersState = {
  filters: {
    maxPrice: number;
    minPrice: number;
    colors: string[];
    sizes: string[];
    brands: string[];
  };
  isOpen: boolean;
};
