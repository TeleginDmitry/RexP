import Head from "next/head";

import OrderPageComponent from "@/src/components/pages/OrderPageComponent";
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
  // await dispatch(getProductThunk({ productSlug: params?.id as string }))

  // const isSuccess = getState().product.success && getState().products.success;

  // if (!isSuccess) {
  //   return {
  //     notFound: true,
  //   };
  // }

  if (false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
});

export default OrderPage;
