export interface FilterType {
  name?: string;
  maxPrice: number;
  minPrice: number;
  colors: string[];
  sizes: string[];
  brands: string[];
  categoryId?: number;
}

export interface FilterCartsType {
  categoryId?: number;
  subcategories?: number[];
  maxPrice: number;
  minPrice: number;
  brands: number[];
}

export interface FilterFavoritesType {
  categoryId?: number;
  subcategories?: number[];
  maxPrice: number;
  minPrice: number;
  brands: number[];
}
