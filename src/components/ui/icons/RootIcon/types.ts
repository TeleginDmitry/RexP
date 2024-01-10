export type IconsVariants = "arrow" | "arrowLeft" | "delete" | "link" | "tg";

export interface RootIconProps {
  name: IconsVariants;
  className?: string;
  disableHover?: boolean;
  rounded?: boolean;
}
