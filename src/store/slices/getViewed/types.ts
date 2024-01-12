export type ViewedType = {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
};

export type ViewedState = Readonly<{
  success: boolean;
  data: ViewedType[];
}>;
