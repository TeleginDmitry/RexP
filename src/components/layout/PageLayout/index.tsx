import type { PropsWithChildren } from "react";

import clsx from "clsx";
import { Toaster } from "sonner";

import { inter, manrope } from "@/src/assets/fonts/fonts";

import Footer from "../_components/Footer";

import s from "./PageLayout.module.scss";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={clsx(s["page-wrapper"], manrope.variable, inter.variable)}>
    <main className={s["page-layout"]}>{children}</main>
    <Footer />
    <Toaster position="top-center" />
  </div>
);

export default PageLayout;
