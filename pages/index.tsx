import Head from "next/head";

import IndexPageComponent from "@/src/components/pages/IndexPageComponent";
import { getCategoriesThunk } from "@/src/store/slices/getCategory/getCategory/getCategory";
import { getFavoritesThunk } from "@/src/store/slices/getFavorite/getFavorite/getFavorite";
import { getProductsThunk } from "@/src/store/slices/getProducts/getProducts/getProducts";
import { wrapper } from "@/src/store/store";

const IndexPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <IndexPageComponent />
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
  await Promise.all([dispatch(getProductsThunk({})), dispatch(getCategoriesThunk()), dispatch(getFavoritesThunk({}))]);

  return {
    props: {},
  };
});

export default IndexPage;
