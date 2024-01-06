import type { ComponentPropsWithoutRef } from "react";

export interface RootButtonProps extends ComponentPropsWithoutRef<"button"> {
  variants?: "default" | "solid";
}
