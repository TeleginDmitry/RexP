import CatalogSpacer from "../../ui/CatalogSpacer";
import MainContainer from "../../ui/MainContainer";
import ProductCard from "../../ui/ProductCard";

import s from "./FavouritesPageComponent.module.scss";

const FavouritesPageComponent = () => (
  <MainContainer className={s.page}>
    <CatalogSpacer>
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={1} liked />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={1} liked />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={1} liked />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={1} liked />
      <ProductCard price={1233} name="Крокодил" imgUrl="/images/indexPage/krokodil.webp" imagePriority id={1} liked />
    </CatalogSpacer>
  </MainContainer>
);

export default FavouritesPageComponent;
