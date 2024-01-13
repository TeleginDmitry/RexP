/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useMemo, useState } from "react";

import { Analytics } from "@vercel/analytics/react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import $api from "@/src/api/api";
import PageLayout from "@/src/components/layout/PageLayout";
import AppContextProvider from "@/src/context/AppContextProvider";
import { getBrandsThunk } from "@/src/store/slices/getBrands/getBrands/getBrands";
import { getCartsThunk } from "@/src/store/slices/getCarts/getCarts/getCarts";
import { getColorsThunk } from "@/src/store/slices/getColors/getColors/getColors";
import { getSizesThunk } from "@/src/store/slices/getSizes/getSizes/getSizes";
import { wrapper } from "@/src/store/store";

import "@/styles/color/_color.scss";
import "@/styles/index.scss";
import "@/styles/nullable.css";
import { toast } from "sonner";

const userInfo = {
  query_id: "",
  user: "",
  first_name: "",
  last_name: "",
  username: "",
  language_code: "",
  examplename: "",
  is_premium: false,
  allows_write_to_pm: false,
  auth_date: "",
  hash: "",
};

const RexPApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const [webApp, setWebApp] = useState<any | null>(null);
  const [cookies, setCookie] = useCookies(["USER_TOKEN"]);

  const router = useRouter();

  useEffect(() => {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.BackButton.onClick(() => router.back());
  }, [router]);

  useEffect(() => {
    if (router.route === "/") {
      window.Telegram.WebApp.BackButton.hide();
    } else {
      window.Telegram.WebApp.BackButton.isVisible = true;
    }
  }, [router.route]);

  const value = useMemo(
    () => (webApp ? { webApp, unsafeData: webApp.initDataUnsafe, user: webApp.initDataUnsafe.user } : {}),
    [webApp]
  );

  useEffect(() => {
    const app = window.Telegram.WebApp;
    app.ready();
    setWebApp(app);
  }, [value.user?.id]);

  useEffect(() => {
    if (value.user && value.unsafeData) {
      userInfo.query_id = value.unsafeData.query_id;
      userInfo.user = value.unsafeData.user;
      userInfo.first_name = value.user.first_name;
      userInfo.last_name = value.user.last_name;
      userInfo.username = value.user.username;
      userInfo.examplename = "examplename";
      userInfo.language_code = value.user.language_code;
      userInfo.is_premium = false;
      userInfo.allows_write_to_pm = value.user.allows_write_to_pm;
      userInfo.auth_date = value.unsafeData.auth_date;
      userInfo.hash = value.unsafeData.hash;
    }

    if (cookies.USER_TOKEN) {
      $api.defaults.headers.Authorization = `Bearer ${cookies.USER_TOKEN}`;
    } else {
      $api
        .post("/user/login", { initData: JSON.stringify(userInfo) })
        .then((res) => {
          if (res.data.token) {
            setCookie("USER_TOKEN", res.data.token, { maxAge: 86400 });
            $api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          $api.post("/user/registration", { initData: JSON.stringify(userInfo) }).then((res) => {
            if (res.data.token) {
              setCookie("USER_TOKEN", res.data.token, { maxAge: 86400 });
              $api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
            }
          });
        });
    }
  }, [cookies.USER_TOKEN, setCookie, value]);

  return (
    <AppContextProvider store={store}>
      <PageLayout>
        {/* <div>{value.unsafeData && Object.keys(value.unsafeData).map((key) => <div key={key}>{key}</div>)}</div> */}
        {/* <div>{value.user && Object.keys(value.user).map((key) => <div key={key}>{key}</div>)}</div> */}
        <Component {...pageProps} />
        {process.env.NEXT_PUBLIC_BUILD_PROFILE !== "test" && <Analytics />}
      </PageLayout>
    </AppContextProvider>
  );
};

RexPApp.getInitialProps = wrapper.getInitialAppProps(
  ({ dispatch }) =>
    async (context: AppContext): Promise<AppInitialProps> => {
      const ctx = await App.getInitialProps(context);

      if (typeof window === "undefined") {
        await Promise.all([
          dispatch(getCartsThunk()),
          dispatch(getColorsThunk()),
          dispatch(getSizesThunk()),
          dispatch(getBrandsThunk()),
        ]);
      }

      return { ...ctx };
    }
);

export default RexPApp;
