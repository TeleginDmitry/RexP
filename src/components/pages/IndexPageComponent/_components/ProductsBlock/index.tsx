import photo1 from "@/public/images/mock/photo1.png";
import photo2 from "@/public/images/mock/photo2.png";
import photo3 from "@/public/images/mock/photo3.png";
import CatalogSpacer from "@/src/components/ui/CatalogSpacer";
import ProductCard from "@/src/components/ui/ProductCard";

import s from "./ProductsBlock.module.scss";

const ProductsBlock = () => {
  const asd = 123;

  return (
    <CatalogSpacer>
      <ProductCard price={7525} name="adidas originals Samba rose" imgUrl={photo1.src} imagePriority id={1} />
      <ProductCard price={16684} name="off-white x Converse 1970s" imgUrl={photo1.src} imagePriority id={2} />
      <ProductCard price={7525} name="adidas originals Samba rose" imgUrl={photo2.src} imagePriority id={3} />
      <ProductCard price={16684} name="off-white x Converse 1970s" imgUrl={photo3.src} imagePriority id={4} />
      <ProductCard price={7525} name="adidas originals Samba rose" imgUrl={photo1.src} imagePriority id={5} />
      <ProductCard price={16684} name="off-white x Converse 1970s" imgUrl={photo2.src} imagePriority id={6} />
    </CatalogSpacer>
  );
};

export default ProductsBlock;
