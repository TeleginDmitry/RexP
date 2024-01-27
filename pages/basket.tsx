import Head from "next/head";

import BasketPageComponent from "@/src/components/pages/BasketPageComponent";
import { getCartsThunk } from "@/src/store/slices/getCarts/getCarts/getCarts";
import { getCategoriesThunk } from "@/src/store/slices/getCategory/getCategory/getCategory";
import { getDeliveryThunk } from "@/src/store/slices/getDelivery/getDelivery/getDelivery";
import { getFavoritesThunk } from "@/src/store/slices/getFavorite/getFavorite/getFavorite";
import { wrapper } from "@/src/store/store";

const BasketPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <BasketPageComponent />
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
  await Promise.all([
    dispatch(getCartsThunk({})),
    dispatch(getCategoriesThunk()),
    dispatch(getDeliveryThunk()),
    dispatch(getFavoritesThunk({})),
  ]);

  return {
    props: {},
  };
});

export default BasketPage;
