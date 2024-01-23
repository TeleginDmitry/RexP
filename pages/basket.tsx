import Head from "next/head";

import BasketPageComponent from "@/src/components/pages/BasketPageComponent";
import { getCartsThunk } from "@/src/store/slices/getCarts/getCarts/getCarts";
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
  await Promise.all([dispatch(getCartsThunk({}))]);

  return {
    props: {},
  };
});

export default BasketPage;
