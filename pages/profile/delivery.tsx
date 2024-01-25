import Head from "next/head";

import DeliveryPageComponent from "@/src/components/pages/DeliveryPageComponent";
import { getOrdersThunk } from "@/src/store/slices/orders/thunks";
import { getStatusThunk } from "@/src/store/slices/status/getStatus/getStatus";
import { wrapper } from "@/src/store/store";

const DeliveryPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <DeliveryPageComponent />
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
  await Promise.all([dispatch(getOrdersThunk({})), dispatch(getStatusThunk())]);

  return {
    props: {},
  };
});
export default DeliveryPage;
