import type { PropsWithChildren } from "react";

import Footer from "../_components/Footer";
import Header from "../_components/Header";

import s from "./PageLayout.module.scss";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={s["page-wrapper"]}>
    <Header />
    <main className={s["page-layout"]}>{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
