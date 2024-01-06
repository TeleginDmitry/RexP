import type { PropsWithChildren } from "react";

import clsx from "clsx";

import { inter, manrope } from "@/src/assets/fonts/fonts";

import Footer from "../_components/Footer";
import Header from "../_components/Header";

import s from "./PageLayout.module.scss";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={clsx(s["page-wrapper"], manrope.variable, inter.variable)}>
    <Header />
    <main className={s["page-layout"]}>{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
