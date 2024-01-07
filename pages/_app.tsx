import { useEffect, useMemo, useState } from "react";

import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import { useRouter } from "next/router";

import PageLayout from "@/src/components/layout/PageLayout";
import AppContextProvider from "@/src/context/AppContextProvider";
import useTelegramInitData from "@/src/hooks/telegram/useTelegramInitData";
import { wrapper } from "@/src/store/store";

import "@/styles/color/_color.scss";
import "@/styles/index.scss";
import "@/styles/nullable.css";

const RexPApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const initData = useTelegramInitData();

  const [asd, setAsd] = useState("");

  const { pageProps } = props;

  const router = useRouter();

  useEffect(() => {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.BackButton.onClick(() => router.back());
  }, [router]);

  useEffect(() => {}, [initData]);

  useEffect(() => {
    if (router.route === "/") {
      window.Telegram.WebApp.BackButton.hide();
    } else {
      window.Telegram.WebApp.BackButton.isVisible = true;
    }
  }, [router.route]);
  const [webApp, setWebApp] = useState<any | null>(null);

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
    }
  }, []);

  const value = useMemo(
    () =>
      webApp
        ? {
            webApp,
            unsafeData: webApp.initDataUnsafe,
            user: webApp.initDataUnsafe.user,
          }
        : {},
    [webApp]
  );
  return (
    <AppContextProvider store={store}>
      <PageLayout>
        <div style={{ fontSize: "50px" }}>{value.user?.username}</div>
        <div style={{ fontSize: "50px" }}>{typeof value.user?.photo_url}</div>
        <div style={{ fontSize: "50px" }}>{value.user?.id}</div>
        <img loading="lazy" src={value.user?.photo_url} alt="" width={100} height={100} />
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
