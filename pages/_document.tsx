import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html lang="ru">
    <Head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
    </Head>
    <body>
      <Main />
      <div id="portal" />
      <NextScript />
    </body>
  </Html>
);

export default Document;
