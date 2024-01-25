export interface Order {
  id: number;
  totalPrice: number;
  trackNumber: string;
  isReviwed: boolean;
  orderStatus: OrderStatus;
  delivery: Delivery;
  orderContents: OrderContent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Delivery {
  firstName: string;
  lastName: string;
  patronymic: string;
  number: string;
  city: string;
  address: string;
  isMain: boolean;
  deliveryType: OrderStatus;
}

export interface OrderStatus {
  id: number;
  name: string;
}

export interface OrderContent {
  id: number;
  count: number;
  sizeId: number;
  userId: number;
  size: Size;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  gender: string;
  amount: number;
  subCategory: SubCategory;
  brand: OrderStatus;
  images: OrderStatus[];
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
  category: Category;
}

export interface Category {
  name: string;
}

export interface Size {
  id: number;
  name: number;
}

export type OrdersState = Readonly<{
  success: boolean;
  data: Order[];
}>;
