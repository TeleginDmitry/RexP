import type { ComponentPropsWithRef } from "react";

export type RootTextProps = ComponentPropsWithRef<"div"> & {
  color?: "black" | "grey" | "white";
  maxWidth?: number;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
  variant?: "11px";
};
