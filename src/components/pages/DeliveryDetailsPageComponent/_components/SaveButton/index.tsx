import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import type { Delivery } from "@/src/types/delivery.types";
import { createDeliveryCart, editDeliveryCart } from "@/src/utils/api/DeliveryCartMethods";

import s from "./SaveButton.module.scss";

interface Props {
  currentAddress: Delivery;
}

const SaveButton = ({ currentAddress }: Props) => {
  const router = useRouter();

  const id = router.query.id as string;
  const onHandleClick = async () => {
    if (!id) {
      return;
    }
    const isAdd = router.pathname.includes("isAdd");

    try {
      if (isAdd) {
        const result = await createDeliveryCart(currentAddress);

        if (result.data) {
          router.back();
        }
      } else {
        const result = await editDeliveryCart(+id, currentAddress);

        if (result.data) {
          router.back();
        }
      }
    } catch (error) {
      /* empty */
    }
  };

  return (
    <Button className={s.button} onClick={onHandleClick}>
      Сохранить данные доставки
    </Button>
  );
};

export default SaveButton;
