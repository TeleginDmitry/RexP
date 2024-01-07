import clsx from "clsx";
import Image from "next/image";

import type { ProductCardProps } from "./types";

import HeartIcon from "../icons/HeartIcon";

import s from "./ProductCard.module.scss";

const ProductCard: React.FC<ProductCardProps> = ({ className, name, id, imgUrl, imagePriority, price }) => (
  <div className={clsx(s.wrapper, className)}>
    <Image
      src={imgUrl}
      alt={name}
      width={145}
      height={107}
      priority={imagePriority}
      className={s.image}
      quality={100}
    />
    <div className={s.content}>
      <div className={s.info}>
        <div className={s.price}>{Number.isNaN(price) ? price : new Intl.NumberFormat("ru-RU").format(+price)} ₽</div>
        <div className={s.name}>{name} </div>
      </div>
      <HeartIcon productId={id} className={s.heart} />
    </div>
  </div>
);

export default ProductCard;
