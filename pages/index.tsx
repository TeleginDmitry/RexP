import Head from "next/head";

import IndexPageComponent from "@/src/components/pages/IndexPageComponent";
import { getProductsThunk } from "@/src/store/slices/getProducts/thunks/getProducts/getProducts";
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

// export const getServerSideProps = wrapper.getServerSideProps(({ dispatch, getState }) => async () => {
//   await dispatch(
//     getProductsThunk({
//       name: "product name",
//       gender: "M",
//       maxPrice: 30000,
//       minPrice: 10000,
//       sizes: [1],
//       subcategories: [1],
//       brands: [1],
//       colors: [1],
//       orderBy: "id",
//       sortBy: "DESC",
//       limit: 10,
//       page: 1,
//     })
//   );

//   const isSuccess = getState().products.success;

//   if (!isSuccess) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {},
//   };
// });

export default IndexPage;
