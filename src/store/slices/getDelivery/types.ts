export interface Delivery {
  firstName: string;
  lastName: string;
  patronymic: string;
  number: string;
  city: string;
  address: string;
  isMain: boolean;
  deliveryType: DeliveryType;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
export interface DeliveryType {
  id: number;
  name: string;
}

export type DeliveryState = Readonly<{
  success: boolean;
  data: Delivery[];
}>;
