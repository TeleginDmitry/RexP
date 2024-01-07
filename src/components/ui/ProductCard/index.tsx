import clsx from "clsx";
import Image from "next/image";

import type { ProductCardProps } from "./types";

import HeartIcon from "../icons/HeartIcon";
import DefaultLink from "../links/DefaultLink";

import s from "./ProductCard.module.scss";

const ProductCard: React.FC<ProductCardProps> = ({
  className,
  name,
  id,
  imgUrl,
  imagePriority,
  price,
  variant = "default",
}) => (
  <div className={clsx(s.wrapper, className, s[variant])}>
    <Image
      src={imgUrl}
      alt={name}
      width={variant === "default" ? 145 : 101}
      height={variant === "default" ? 107 : 59}
      priority={imagePriority}
      className={s.image}
      quality={100}
    />
    <DefaultLink href={`/catalog/${id}`} className={s.link} />
    <div className={s.content}>
      <div className={clsx(s.info, s[variant])}>
        <div className={s.price}>{Number.isNaN(price) ? price : new Intl.NumberFormat("ru-RU").format(+price)} ₽</div>
        <div className={s.name}>{name} </div>
      </div>
      <HeartIcon productId={id} className={s.heart} variant={variant} />
    </div>
  </div>
);

export default ProductCard;
