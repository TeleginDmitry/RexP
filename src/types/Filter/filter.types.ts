export interface FilterType {
  name: string;
  maxPrice: number;
  minPrice: number;
  colors: string[];
  sizes: string[];
  brands: string[];
  categoryId?: number;
}
