export type SizeType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type SizesState = Readonly<{
  success: boolean;
  data: SizeType[];
}>;
