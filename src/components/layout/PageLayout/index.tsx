import type { PropsWithChildren } from "react";

import clsx from "clsx";
import { Toaster } from "sonner";

import { inter, manrope } from "@/src/assets/fonts/fonts";

import Footer from "../_components/Footer";
import MainFilter from "../_components/MainFilter";

import s from "./PageLayout.module.scss";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={clsx(s["page-wrapper"], manrope.variable, inter.variable)}>
    <main className={s["page-layout"]}>{children}</main>
    <Footer />
    <MainFilter />
    <Toaster position="top-center" richColors />
  </div>
);

export default PageLayout;
