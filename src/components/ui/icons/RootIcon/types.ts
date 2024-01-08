export type IconsVariants = "arrow" | "arrowLeft" | "link" | "tg";

export interface RootIconProps {
  name: IconsVariants;
  className?: string;
  disableHover?: boolean;
  rounded?: boolean;
}
