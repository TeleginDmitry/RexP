import type { ComponentPropsWithRef } from "react";

export type RootTextProps = ComponentPropsWithRef<"div"> & {
  color?: "default";
  maxWidth?: number;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
  variant?: "14px" | "16px";
};
