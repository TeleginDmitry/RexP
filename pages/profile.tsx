import Head from "next/head";

import ProfilePageComponent from "@/src/components/pages/ProfilePageComponent";
import { getFavoritesThunk } from "@/src/store/slices/getFavorite/getFavorite/getFavorite";
import { getProductsThunk } from "@/src/store/slices/getProducts/getProducts/getProducts";
import { getViewedThunk } from "@/src/store/slices/getViewed/getViewed/getViewed";
import { wrapper } from "@/src/store/store";

const ProfilePage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <ProfilePageComponent />
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
  await Promise.all([dispatch(getProductsThunk({})), dispatch(getViewedThunk()), dispatch(getFavoritesThunk({}))]);

  return {
    props: {},
  };
});

export default ProfilePage;
