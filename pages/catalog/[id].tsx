import Head from "next/head";

import ProductPageComponent from "@/src/components/pages/ProductPageComponent";
import { wrapper } from "@/src/store/store";

const ProductPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <ProductPageComponent />
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

export default ProductPage;
