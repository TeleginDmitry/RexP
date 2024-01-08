import { useLocalStorage } from "@mantine/hooks";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

import { PRODUCTS_IN_BASKET_LS_KEY } from "@/src/constants";

import s from "./AddButton.module.scss";

const AddButton = () => {
  const router = useRouter();
  const [basketValue, setBasketValue] = useLocalStorage({
    key: PRODUCTS_IN_BASKET_LS_KEY,
    defaultValue: "",
  });

  const onHandleClick = () => {
    if (!basketValue) {
      setBasketValue(JSON.stringify([router.query.id]));
      return;
    }
    const productsId = JSON.parse(basketValue!) as string[];

    if (productsId.filter((id) => id !== router.query.id).length === 6) {
      productsId.pop();
    }
    const newProductsId = [router.query.id, ...productsId.filter((id) => id !== router.query.id)];
    if (JSON.stringify(newProductsId) !== basketValue) {
      setBasketValue(JSON.stringify(newProductsId));
    }
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
