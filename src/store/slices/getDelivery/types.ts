export type DeliveryType = {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  number: string;
  city: string;
  address: string;
  isMain: boolean;
  deliveryType: { id: number; name: string };
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export type DeliveryState = Readonly<{
  success: boolean;
  data: DeliveryType[];
}>;
