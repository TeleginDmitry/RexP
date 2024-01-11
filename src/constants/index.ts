import photo1 from "@/public/images/mock/photo1.png";
import photo2 from "@/public/images/mock/photo2.png";
import photo3 from "@/public/images/mock/photo3.png";

export const MAX_FAVOURITES_PRODUCTS = 4;
export const MAX_FAVOURITES_LS_KEY = "favourites";

export const MAX_PRODUCTS_IN_HISTORY = 30;
export const PRODUCTS_IN_HISTORY_LS_KEY = "history";

export const MAX_PRODUCTS_IN_BASKET = 100;
export const PRODUCTS_IN_BASKET_LS_KEY = "basket";

export const MAX_ADDRESSES = 5;
export const ADDRESSES_LS_KEY = "addresses";

export const DELIVERY_TYPES = {
  PICK: "Пункт выдачи заказа",
  COURIER: "Курьером",
} as const;

export type DeliveryType = (typeof DELIVERY_TYPES)[keyof typeof DELIVERY_TYPES];

export const PRODUCTS = [
  {
    price: 7525,
    name: "adidas originals Samba rose",
    imgUrl: photo1.src,
    id: 1,
    outOfStock: false,
  },
  {
    price: 16684,
    name: "off-white x Converse 1970s",
    imgUrl: photo1.src,
    id: 2,
    outOfStock: true,
  },
  {
    price: 7525,
    name: "adidas originals Samba rose",
    imgUrl: photo2.src,
    id: 3,
    outOfStock: false,
  },
  {
    price: 16684,
    name: "off-white x Converse 1970s",
    imgUrl: photo3.src,
    id: 4,
    outOfStock: false,
  },
  {
    price: 7525,
    name: "adidas originals Samba rose",
    imgUrl: photo1.src,
    id: 5,
    outOfStock: false,
  },
  {
    price: 16684,
    name: "off-white x Converse 1970s",
    imgUrl: photo2.src,
    id: 6,
    outOfStock: false,
  },
];
