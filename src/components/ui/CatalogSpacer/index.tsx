import type { PropsWithChildren } from "react";

import s from "./CatalogSpacer.module.scss";

interface CatalogSpacerProps extends PropsWithChildren {}

const CatalogSpacer: React.FC<CatalogSpacerProps> = ({ children }) => <div className={s.wrapper}>{children}</div>;

export default CatalogSpacer;
