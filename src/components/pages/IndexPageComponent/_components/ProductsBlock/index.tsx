import CatalogSpacer from "@/src/components/ui/CatalogSpacer";
import ProductCard from "@/src/components/ui/ProductCard";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import s from "./ProductsBlock.module.scss";

const ProductsBlock = () => {
  const products = useAppSelector((state) => state.products.data);
console.log(products)
  return (
    <CatalogSpacer>
      {products.map(({ id, name, price, images }, index) => (
        <ProductCard key={id} price={price} name={name} imgUrl={images[0].name} imagePriority={index < 4} id={id} />
      ))}
    </CatalogSpacer>
  );
};

export default ProductsBlock;
