import clsx from "clsx";
import Image from "next/image";

import type { DeliveryTypeOrImagesEntityOrBrandOrOrderStatus } from "@/src/types/order.types";

import styles from "./ImagesBlock.module.scss";

interface Props {
  images: Array<DeliveryTypeOrImagesEntityOrBrandOrOrderStatus | null | undefined> | undefined;
}
export const ImagesBlock = ({ images }: Props) => (
  <div className={styles.photos}>
    {images?.slice(0, 3).map((image) => (
      <div className={styles.photo} key={image?.id}>
        <Image src={`${process.env.NEXT_PUBLIC_IMAGES_URL}${image?.name}`} alt="фото" width={100} height={100} />
      </div>
    ))}
    {images && images.length > 3 && (
      <div className={clsx(styles.more, styles.photo)}>
        <span>+{images.length - 3}</span>
      </div>
    )}
  </div>
);
