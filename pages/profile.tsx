import Head from "next/head";

import ProfilePageComponent from "@/src/components/pages/ProfilePageComponent";

const ProfilePage = () => (
  <>
    <Head>
      <title>title</title>
      <meta name="description" content="description" />
    </Head>
    <ProfilePageComponent />
  </>
);

export default ProfilePage;
