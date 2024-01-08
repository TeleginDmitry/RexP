import { Analytics } from "@vercel/analytics/react";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html lang="ru">
    <Head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
    </Head>
    <body>
      <Main />
      <NextScript />
      <Analytics />
    </body>
  </Html>
);

export default Document;
