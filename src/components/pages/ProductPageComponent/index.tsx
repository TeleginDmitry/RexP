import { useEffect } from "react";

import router from "next/router";

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { getOneProductThunk } from "@/src/store/slices/getOneProduct/getOneProduct/getOneProduct";

import AccordionBlock from "./_components/AccordionBlock";
import AddButton from "./_components/AddButton";
import InfoBlock from "./_components/InfoBlock";
import SizesBlock from "./_components/SizesBlock";
import SliderBlock from "./_components/SliderBlock";

import MainContainer from "../../ui/MainContainer";

import s from "./ProductPageComponent.module.scss";

const ProductPageComponent = () => {
  const product = useAppSelector((state) => state.product);
  const carts = useAppSelector((state) => state.carts.data);

  // const router = useRouter();
  // const isClient = useClientSide();
  // const [historyValue, setHistoryValue] = useLocalStorage({
  //   key: PRODUCTS_IN_HISTORY_LS_KEY,
  //   defaultValue: "",
  // });

  // useEffect(() => {
  //   if (isClient) {
  //     setTimeout(() => {
  //       if (!historyValue) {
  //         setHistoryValue(JSON.stringify([router.query.id]));
  //         return;
  //       }
  //       const productsId = JSON.parse(historyValue!) as string[];

  //       if (productsId.filter((id) => id !== router.query.id).length === MAX_PRODUCTS_IN_HISTORY) {
  //         productsId.pop();
  //       }
  //       const newProductsId = [router.query.id, ...productsId.filter((id) => id !== router.query.id)];
  //       if (JSON.stringify(newProductsId) !== historyValue) {
  //         setHistoryValue(JSON.stringify(newProductsId));
  //       }
  //     }, 150);
  //   }
  // }, [historyValue, isClient, router.query.id]);

  return (
    <MainContainer className={s.wrapper}>
      <SliderBlock />
      <InfoBlock />
      <SizesBlock />
      <AccordionBlock />
      <AddButton />
    </MainContainer>
  );
};

export default ProductPageComponent;
