/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect } from "react";

import { useLocalStorage } from "@mantine/hooks";

import { MAX_FAVOURITES_LS_KEY, PRODUCTS } from "@/src/constants";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { createFavorite } from "@/src/utils/api/createFavorite";

import CatalogSpacer from "../../ui/CatalogSpacer";
import MainContainer from "../../ui/MainContainer";
import ProductCard from "../../ui/ProductCard";

import s from "./FavouritesPageComponent.module.scss";

const FavouritesPageComponent = () => {
  const favorites = useAppSelector((state) => state.favorites.data);
  const products = useAppSelector((state) => state.products.data);

  return (
    <MainContainer className={s.page}>
      <CatalogSpacer>
        {favorites.map(({ productId }, index) => {
          const product = products.find((productValue) => productValue.id === +productId);

          return (
            product && (
              <ProductCard
                id={product.id}
                key={product.id}
                name={product.name}
                price={product.price}
                imgUrl={product.images[0].name}
                imagePriority={index < 3}
                outOfStock={false}
              />
            )
          );
        })}
      </CatalogSpacer>
    </MainContainer>
  );
};

export default FavouritesPageComponent;
