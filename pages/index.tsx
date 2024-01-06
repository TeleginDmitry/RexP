import Head from "next/head";

import IndexPageComponent from "@/src/components/pages/IndexPageComponent";

const IndexPage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <IndexPageComponent />
  </>
);

export default IndexPage;
