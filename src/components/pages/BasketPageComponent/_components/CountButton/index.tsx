import { useLocalStorage } from "@mantine/hooks";
import { Button } from "@nextui-org/react";
import clsx from "clsx";

import { PRODUCTS_IN_BASKET_LS_KEY } from "@/src/constants";

import s from "./CountButton.module.scss";

interface CountButtonProps {
  size: string;
  id: string;
  quantity: string;
}

const CountButton: React.FC<CountButtonProps> = ({ size, id, quantity }) => {
  const [basketValue, setBasketValue] = useLocalStorage({ key: PRODUCTS_IN_BASKET_LS_KEY, defaultValue: "" });

  const onHandleClick = (action: "decrement" | "increment") => {
    if (!basketValue) {
      return;
    }

    const products = JSON.parse(basketValue!) as Array<{ id: string; size: string; quantity: number }>;
    const newProducts = products.map((product) => {
      if (product.id === id && product.size === size) {
        if (action === "decrement" && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        if (action === "increment") {
          return { ...product, quantity: product.quantity + 1 };
        }
      }
      return product;
    });

    setBasketValue(JSON.stringify(newProducts));
  };

  return (
    <div className={s.wrapper}>
      <Button
        disabled={+quantity === 1}
        className={clsx(s.button, +quantity === 1 && s.disabled)}
        onClick={() => onHandleClick("decrement")}
      >
        -
      </Button>
      <div className={s.count}>{quantity}</div>
      <Button className={s.button} onClick={() => onHandleClick("increment")}>
        +
      </Button>
    </div>
  );
};

export default CountButton;
