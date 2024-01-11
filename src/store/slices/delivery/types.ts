export type DeliveryState = {
  address: {
    city: string;
    street: string;
    house?: string;
    flat?: string;
  };
  recipient: {
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
  };
};
