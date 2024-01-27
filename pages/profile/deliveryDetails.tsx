import Head from "next/head";

import DeliveryDetailsPageComponent from "@/src/components/pages/DeliveryDetailsPageComponent";
import { getDeliveryThunk } from "@/src/store/slices/delivery/thunks/getDelivery";
import { wrapper } from "@/src/store/store";

const DeliveryDetailsPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <DeliveryDetailsPageComponent />
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async (context) => {
  const { query } = context;

  const { id } = query as unknown as { id: string | undefined };

  if (id) {
    await Promise.all([dispatch(getDeliveryThunk(+id))]);
  }

  return {
    props: {},
  };
});

export default DeliveryDetailsPage;
