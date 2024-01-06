import type { PropsWithChildren } from "react";

import Footer from "../Footer";
import Header from "../Header";

import s from "./PageLayout.module.scss";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={s["page-wrapper"]}>
    <Header />
    <main className={s["page-layout"]}>{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
