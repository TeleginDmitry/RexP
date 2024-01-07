import { useState } from "react";

import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";

import type { ProductCardProps } from "./types";

import HeartIcon from "../icons/HeartIcon";
import DefaultLink from "../links/DefaultLink";

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
        <div className={s.price}>{price} ₽</div>
        <div className={s.name}>{name} </div>
      </div>
      <HeartIcon productId={id} className={s.heart} />
    </div>
  </div>
);

export default ProductCard;
