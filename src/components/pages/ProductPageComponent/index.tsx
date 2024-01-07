import { useEffect } from "react";

import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

import { MAX_PRODUCTS_IN_HISTORY_LS_KEY } from "@/src/constants";
import useClientSide from "@/src/hooks/useClientSide";

import s from "./ProductPageComponent.module.scss";

const ProductPageComponent = () => {
  const router = useRouter();
  const isClient = useClientSide();
  const [historyValue, setHistoryValue] = useLocalStorage({
    key: MAX_PRODUCTS_IN_HISTORY_LS_KEY,
    defaultValue: "",
  });

  useEffect(() => {
    if (isClient) {
      setTimeout(() => {
        if (!historyValue) {
          setHistoryValue(JSON.stringify([router.query.id]));
          return;
        }
        const productsId = JSON.parse(historyValue!) as string[];

        if (productsId.filter((id) => id !== router.query.id).length === 6) {
          productsId.pop();
        }
        const newProductsId = [router.query.id, ...productsId.filter((id) => id !== router.query.id)];
        if (JSON.stringify(newProductsId) !== historyValue) {
          setHistoryValue(JSON.stringify(newProductsId));
        }
      }, 1000);
    }
  }, [historyValue, isClient, router.query.id]);

  return <div className={s[""]}>{router.query.id}</div>;
};

export default ProductPageComponent;
