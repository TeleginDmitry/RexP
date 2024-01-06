import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import parser from "ua-parser-js";

import PageLayout from "@/src/components/layouts/PageLayout";
import AppContextProvider from "@/src/context/AppContextProvider";
import { wrapper } from "@/src/store/store";

import "@/styles/color/_color.scss";
import "@/styles/index.scss";
import "@/styles/nullable.css";

type AppOwnProps = { device: string };

// TODO: change name
const NameApp = ({ Component, device, ...rest }: AppOwnProps & AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const { pageProps } = props;

  return (
    <AppContextProvider device={device} store={store}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </AppContextProvider>
  );
};

// TODO: change name
NameApp.getInitialProps = wrapper.getInitialAppProps(
  () =>
    async (context: AppContext): Promise<AppInitialProps & AppOwnProps> => {
      const ctx = await App.getInitialProps(context);

      let device: string = "desktop";

      if (context.ctx.req && typeof window === "undefined") {
        device = parser(context.ctx.req.headers["user-agent"]).device.type ?? "desktop";
      }

      return { ...ctx, device };
    }
);

export default NameApp;
