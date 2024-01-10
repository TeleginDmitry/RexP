import { useLocalStorage } from "@mantine/hooks";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import RootButton from "@/src/components/ui/RootButton";
import { PRODUCTS_IN_BASKET_LS_KEY } from "@/src/constants";

import s from "./DeleteButton.module.scss";

interface DeleteButtonProps {
  size: string;
  id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ size, id }) => {
  const [basketValue, setBasketValue] = useLocalStorage({
    key: PRODUCTS_IN_BASKET_LS_KEY,
    defaultValue: "",
  });

  const onHandleClick = () => {
    if (!basketValue) {
      return;
    }

    const products = JSON.parse(basketValue!) as Array<{ id: string; size: string; quantity: number }>;
    const newProducts = products.filter((product) => product.id !== id || product.size !== size);

    setBasketValue(JSON.stringify(newProducts));
  };

  return (
    <RootButton onClick={onHandleClick}>
      <RootIcon name="delete" />
    </RootButton>
  );
};

export default DeleteButton;
