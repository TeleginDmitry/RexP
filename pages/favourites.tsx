import Head from "next/head";

import FavouritesPageComponent from "@/src/components/pages/FavouritesPageComponent";

const FavouritesPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <FavouritesPageComponent />
  </>
);

export default FavouritesPage;
