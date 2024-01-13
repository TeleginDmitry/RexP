export type CartType = {
  id: number;
  count: number;
  userId: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    gender: string;
    amount: number;
    images: Array<{
      name: string;
    }>;
    subCategoryId: number;
  };
  productSize: {
    id: number;
    amount: number;
    size: {
      id: number;
      name: string;
    };
  };
};

export type CartsState = Readonly<{
  success: boolean;
  data: CartType[];
}>;
