import { PRODUCTS } from "@/src/constants";

import CatalogSpacer from "../../ui/CatalogSpacer";
import MainContainer from "../../ui/MainContainer";
import ProductCard from "../../ui/ProductCard";

import s from "./FavouritesPageComponent.module.scss";

const FavouritesPageComponent = () => (
  <MainContainer className={s.page}>
    <CatalogSpacer>
      {PRODUCTS.map(({ id, name, price, imgUrl }) => (
        <ProductCard key={id} price={price} name={name} imgUrl={imgUrl} imagePriority id={id} />
      ))}
    </CatalogSpacer>
  </MainContainer>
);

export default FavouritesPageComponent;
