export type IconsVariants = "arrow" | "arrowLeft" | "tg";

export interface RootIconProps {
  name: IconsVariants;
  className?: string;
  disableHover?: boolean;
  rounded?: boolean;
}
