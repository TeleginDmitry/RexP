import { useEffect, useState } from "react";

import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import { useRouter } from "next/router";

import PageLayout from "@/src/components/layout/PageLayout";
import AppContextProvider from "@/src/context/AppContextProvider";
import { wrapper } from "@/src/store/store";

import "@/styles/color/_color.scss";
import "@/styles/index.scss";
import "@/styles/nullable.css";

const RexPApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const [asd, setAsd] = useState("");

  const { pageProps } = props;

  const router = useRouter();

  useEffect(() => {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.BackButton.onClick(() => router.back());
    const params = new URLSearchParams(window.Telegram.WebApp.initData);

    const userData = Object.fromEntries(params);
    if (userData.user) {
      userData.user = JSON.parse(userData.user);
      setAsd((userData.user as any).photo_url);
    }
  }, [router]);

  useEffect(() => {
    if (router.route === "/") {
      window.Telegram.WebApp.BackButton.hide();
    } else {
      window.Telegram.WebApp.BackButton.isVisible = true;
    }
  }, [router.route]);

  return (
    <AppContextProvider store={store}>
      <PageLayout>
        <div style={{ fontSize: "50px" }}>{asd}123</div>
        <Component {...pageProps} />
      </PageLayout>
    </AppContextProvider>
  );
};

RexPApp.getInitialProps = wrapper.getInitialAppProps(() => async (context: AppContext): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx };
});

export default RexPApp;
