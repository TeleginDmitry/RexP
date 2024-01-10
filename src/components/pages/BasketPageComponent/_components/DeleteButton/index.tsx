import type { Dispatch, SetStateAction } from "react";

import { useLocalStorage } from "@mantine/hooks";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import RootButton from "@/src/components/ui/RootButton";
import { PRODUCTS_IN_BASKET_LS_KEY } from "@/src/constants";

import s from "./DeleteButton.module.scss";

interface DeleteButtonProps {
  size: string;
  id: string;
  setSelected: Dispatch<SetStateAction<string[]>>;
  selected: string[];
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ size, id, setSelected, selected }) => {
  const [basketValue, setBasketValue] = useLocalStorage({ key: PRODUCTS_IN_BASKET_LS_KEY, defaultValue: "" });

  const onHandleClick = () => {
    if (!basketValue) {
      return;
    }

    const products = JSON.parse(basketValue!) as Array<{ id: string; size: string; quantity: number }>;
    const newProducts = products.filter((product) => product.id !== id || product.size !== size);

    setBasketValue(JSON.stringify(newProducts));
    setSelected(selected.filter((item) => newProducts.find((product) => item === `${product.id}-${product.size}`)));
  };

  return (
    <RootButton onClick={onHandleClick} className={s.button}>
      <RootIcon name="delete" />
    </RootButton>
  );
};

export default DeleteButton;
