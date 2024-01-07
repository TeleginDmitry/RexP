/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useLocalStorage } from "@mantine/hooks";

import { MAX_FAVOURITES_LS_KEY, PRODUCTS } from "@/src/constants";

import CatalogSpacer from "../../ui/CatalogSpacer";
import MainContainer from "../../ui/MainContainer";
import ProductCard from "../../ui/ProductCard";

import s from "./FavouritesPageComponent.module.scss";

const FavouritesPageComponent = () => {
  const [favouritesValue] = useLocalStorage({ key: MAX_FAVOURITES_LS_KEY, defaultValue: "" });

  return (
    <MainContainer className={s.page}>
      <CatalogSpacer>
        {favouritesValue?.split(".").map((id: string, index) => {
          const product = PRODUCTS.find((productValue) => productValue.id === +id);

          return (
            product && (
              <ProductCard
                id={product.id}
                key={product.id}
                name={product.name}
                price={product.price}
                imgUrl={product.imgUrl}
                imagePriority={index < 3}
                outOfStock={product.outOfStock}
              />
            )
          );
        })}
      </CatalogSpacer>
    </MainContainer>
  );
};

export default FavouritesPageComponent;
