import Head from "next/head";

import FavouritesPageComponent from "@/src/components/pages/FavouritesPageComponent";
import { getFavoritesThunk } from "@/src/store/slices/getFavorite/getFavorite/getFavorite";
import { getProductsThunk } from "@/src/store/slices/getProducts/getProducts/getProducts";
import { wrapper } from "@/src/store/store";

const FavouritesPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <FavouritesPageComponent />
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
  await Promise.all([dispatch(getProductsThunk({})), dispatch(getFavoritesThunk({}))]);

  return {
    props: {},
  };
});

export default FavouritesPage;
