import CatalogSpacer from "@/src/components/ui/CatalogSpacer";
import ProductCard from "@/src/components/ui/ProductCard";
import { PRODUCTS } from "@/src/constants";

import s from "./ProductsBlock.module.scss";

const ProductsBlock = () => {
  const asd = 123;

  return (
    <CatalogSpacer>
      {PRODUCTS.map(({ id, name, price, imgUrl }, index) => (
        <ProductCard key={id} price={price} name={name} imgUrl={imgUrl} imagePriority={index < 4} id={id} />
      ))}
    </CatalogSpacer>
  );
};

export default ProductsBlock;
