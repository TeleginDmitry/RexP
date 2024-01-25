export interface Cart {
  id: number;
  count: number;
  userId: number;
  productSizeId: number;
  product: Product;
  createdAt: string;
  productSize: {
    id: number;
    price: number;
    amount: number;
    size: CategoryOrSize;
  };
}
export interface Product {
  id: number;
  name: string;
  discount: number;
  gender: string;
  poizonURL?: null;
  subCategory: SubCategory;
  brand: ImagesEntityOrBrand;
  images?: ImagesEntityOrBrand[] | null;
  productSizes?: ProductSizesEntity[] | null;
}
export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
  category: CategoryOrSize;
}
export interface CategoryOrSize {
  name: string;
}
export interface ImagesEntityOrBrand {
  id: number;
  name: string;
}
export interface ProductSizesEntity {
  id: number;
  price: number;
  amount: number;
  size: CategoryOrSize;
}

export type CartsState = Readonly<{
  success: boolean;
  data: Cart[];
}>;
