import Head from "next/head";

import ProductPageComponent from "@/src/components/pages/ProductPageComponent";
import { getFavoritesThunk } from "@/src/store/slices/getFavorite/getFavorite/getFavorite";
import { getOneProductThunk } from "@/src/store/slices/getOneProduct/getOneProduct/getOneProduct";
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
  await Promise.all([dispatch(getOneProductThunk(params?.id as string)), dispatch(getFavoritesThunk())]);

  const isSuccess = getState().product.success && getState().favorites.success;

  if (!isSuccess) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
});

export default ProductPage;
