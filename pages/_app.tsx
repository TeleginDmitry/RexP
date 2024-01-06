import type { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";

import PageLayout from "@/src/components/layouts/PageLayout";
import AppContextProvider from "@/src/context/AppContextProvider";
import { wrapper } from "@/src/store/store";

import "@/styles/color/_color.scss";
import "@/styles/index.scss";
import "@/styles/nullable.css";

const RexPApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const { pageProps } = props;

  return (
    <AppContextProvider store={store}>
      <PageLayout>
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
