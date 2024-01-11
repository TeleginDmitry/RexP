import type { DeliveryType } from "@/src/constants";

export type FiltersState = {
  indexPage: {
    activeFilter: string;
  };
  myOrdersPage: {
    activeFilter: string;
  };
  sizes: {
    activeFilter: string;
  };
  productsInBasket: {
    activeFilter: string;
  };
  deliveryDetailsPage: {
    activeFilter: DeliveryType;
  };
};
