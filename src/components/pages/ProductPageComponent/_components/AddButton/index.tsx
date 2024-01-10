import { useLocalStorage } from "@mantine/hooks";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { MAX_PRODUCTS_IN_BASKET, PRODUCTS_IN_BASKET_LS_KEY } from "@/src/constants";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { getProductsValue } from "@/src/utils/getProductsValue";

import s from "./AddButton.module.scss";

const AddButton = () => {
  const router = useRouter();
  const size = useAppSelector((state) => state.filters.sizes.activeFilter);
  const [basketValue, setBasketValue] = useLocalStorage({
    key: PRODUCTS_IN_BASKET_LS_KEY,
    defaultValue: "",
  });

  const onHandleClick = () => {
    if (!basketValue) {
      setBasketValue(JSON.stringify([{ id: router.query.id, size, quantity: 1 }]));
      return;
    }

    if (getProductsValue(basketValue) >= MAX_PRODUCTS_IN_BASKET) {
      toast.error(`Максимальное количество позиций в корзине - ${MAX_PRODUCTS_IN_BASKET}`);
      return;
    }

    const products = JSON.parse(basketValue!) as Array<{ id: string; size: string; quantity: number }>;

    if (products.find((product) => product.id === router.query.id && product.size === size)) {
      const newProducts = products.map((product) => {
        if (product.id === router.query.id && product.size === size) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }

        return product;
      });

      setBasketValue(JSON.stringify(newProducts));

      return;
    }

    setBasketValue(JSON.stringify([...products, { id: router.query.id, size, quantity: 1 }]));
  };

  return (
    <div className={s.wrapper}>
      <Button className={s.button} onClick={onHandleClick}>
        Добавить в корзину
      </Button>
    </div>
  );
};

export default AddButton;
