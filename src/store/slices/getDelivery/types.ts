export type DeliveryType = {
  firstName: string;
  lastName: string;
  patronymic: string;
  number: string;
  city: string;
  address: string;
  isMain: boolean;
  deliveryType: {
    id: number;
    name: string;
  };
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type DeliveryState = Readonly<{
  success: boolean;
  data: DeliveryType[];
}>;
