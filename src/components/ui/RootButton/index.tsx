import clsx from "clsx";

import type { RootButtonProps } from "./types";

import s from "./RootButton.module.scss";

const RootButton: React.FC<RootButtonProps> = ({ className, variants, ...props }) => (
  <button className={clsx(s.button, variants && variants !== "default" && s[variants], className)} {...props} />
);

export default RootButton;
