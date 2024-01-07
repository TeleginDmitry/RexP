import CatalogSpacer from "@/src/components/ui/CatalogSpacer";
import ProductCard from "@/src/components/ui/ProductCard";

import s from "./ProductsBlock.module.scss";

const ProductsBlock = () => {
  const asd = 123;

  return (
    <CatalogSpacer>
      <ProductCard
        price={1233}
        name="Крокодил Крокодил Крокодил Крокодил КрокодилК рокод илКрокодил Крокодил"
        imgUrl="/images/indexPage/krokodil.webp"
        imagePriority
        id={1}
      />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={2} />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={3} />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={4} />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={5} />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={6} />
    </CatalogSpacer>
  );
};

export default ProductsBlock;
