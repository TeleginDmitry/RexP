import { useLocalStorage } from "@mantine/hooks";
import ScrollContainer from "react-indiana-drag-scroll";

import ProductCard from "@/src/components/ui/ProductCard";
import { PRODUCTS_IN_HISTORY_LS_KEY, PRODUCTS } from "@/src/constants";

import s from "./HistoryProducts.module.scss";

interface HistoryProductsProps {}

const HistoryProducts: React.FC<HistoryProductsProps> = () => {
  const [historyValue] = useLocalStorage({ key: PRODUCTS_IN_HISTORY_LS_KEY, defaultValue: "" });

  if (!historyValue) {
    return null;
  }

  return (
    <ScrollContainer className={s.wrapper}>
      {JSON.parse(historyValue!).map((id: string) => {
        const product = PRODUCTS.find((productValue) => productValue.id === +id);

        return (
          product && (
            <ProductCard
              key={product.id}
              price={product.price}
              name={product.name}
              imgUrl={product.imgUrl}
              imagePriority
              id={product.id}
            />
          )
        );
      })}
    </ScrollContainer>
  );
};

export default HistoryProducts;
