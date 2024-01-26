import Head from "next/head";

import OrderPageComponent from "@/src/components/pages/OrderPageComponent";
import { getOrderThunk } from "@/src/store/slices/order/thunks";
import { wrapper } from "@/src/store/store";

const OrderPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <OrderPageComponent />
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async ({ params }) => {
  const id = params?.id as string;

  await dispatch(getOrderThunk({ id: +id }));

  return {
    props: {},
  };
});

export default OrderPage;
