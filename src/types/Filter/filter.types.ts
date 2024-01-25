export interface FilterType {
  name?: string;
  maxPrice: number;
  minPrice: number;
  colors: string[];
  sizes: string[];
  brands: string[];
  categoryId?: number;
  orderBy?: "id" | "price";
  sortBy?: "ASC" | "DESC";
}

export interface FilterCartsType {
  categoryId?: number;
  subcategories?: number[];
  maxPrice: number;
  minPrice: number;
  brands: string[];
}

export interface FilterFavoritesType {
  categoryId?: number;
  subcategories?: number[];
  maxPrice: number;
  minPrice: number;
  brands: string[];
}
