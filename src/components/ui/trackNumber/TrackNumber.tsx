import { Snippet } from "@nextui-org/react";

import styles from "./Styles.module.scss";

interface Props {
  trackNumber: number | string;
}

export const TrackNumber = ({ trackNumber }: Props) => (
  <div className={styles.trackNumber}>
    <span className={`${styles.name} font-semibold`}>Трек номер:</span>
    <Snippet className={styles.snippet} tooltipProps={{ className: styles.tooltip, content: "Скопировать номер" }}>
      {trackNumber}
    </Snippet>
  </div>
);
