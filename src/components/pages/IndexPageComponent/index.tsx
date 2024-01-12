import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { getProductsThunk } from "@/src/store/slices/getProducts/getProducts/getProducts";

import InfoBlock from "./_components/InfoBlock";
import ProductsBlock from "./_components/ProductsBlock";
import RexBlock from "./_components/RexBlock";
import TabsBlock from "./_components/TabsBlock";

import MainContainer from "../../ui/MainContainer";

import s from "./IndexPageComponent.module.scss";

const IndexPageComponent = () => {
  const dispatch = useAppDispatch();
  // const products = useAppSelector(state => state.products);

  // console.log(products)

  // useEffect(() => {
  //   dispatch(
  //     getProductsThunk({
  //       name: "product name",
  //       gender: "M",
  //       maxPrice: 30000,
  //       minPrice: 10000,
  //       sizes: [1],
  //       subcategories: [1],
  //       brands: [1],
  //       colors: [1],
  //       orderBy: "id",
  //       sortBy: "DESC",
  //       limit: 10,
  //       page: 1,
  //     })
  //   );
  // }, [dispatch]);

  return (
    <MainContainer className={s.page}>
      <InfoBlock />
      <RexBlock />
      <TabsBlock />
      <ProductsBlock />
    </MainContainer>
  );
};

export default IndexPageComponent;
