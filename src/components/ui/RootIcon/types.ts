export type IconsVariants = "arrow" | "tg";

export interface RootIconProps {
  name: IconsVariants;
  className?: string;
  disableHover?: boolean;
  rounded?: boolean;
}
