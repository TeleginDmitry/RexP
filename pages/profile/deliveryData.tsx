import Head from "next/head";

import DeliveryDataPageComponent from "@/src/components/pages/DeliveryDataPageComponent";
import { getDeliveryThunk } from "@/src/store/slices/getDelivery/getDelivery/getDelivery";
import { wrapper } from "@/src/store/store";

const DeliveryDataPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <DeliveryDataPageComponent />
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
  await Promise.all([dispatch(getDeliveryThunk())]);

  return {
    props: {},
  };
});

export default DeliveryDataPage;
