import clsx from "clsx";

import type { RootLinkProps } from "./types";

import DefaultLink from "../DefaultLink";

import s from "./RootLink.module.scss";

const RootLink: React.FC<RootLinkProps> = ({ className, ...props }) => (
  <DefaultLink className={clsx(s.link, className)} {...props} />
);

export default RootLink;
