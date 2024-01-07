import { useState } from "react";

import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";

import type { ProductCardProps } from "./types";

import HeartIcon from "../icons/HeartIcon";
import DefaultLink from "../links/DefaultLink";

import s from "./ProductCard.module.scss";

const ProductCard: React.FC<ProductCardProps> = ({ className, name, id, imgUrl, imagePriority, price, liked }) => (
  <div className={clsx(s.wrapper, className)}>
    <div className={s.image}>
      <Image src={imgUrl} alt={name} width={145} height={107} priority={imagePriority} />
    </div>
    <div className={s.content}>
      <div className={s.info}>
        <div className={s.price}>{price} ₽</div>
        <div className={s.name}>{name} </div>
      </div>
      <HeartIcon liked={liked} />
    </div>
  </div>
);

export default ProductCard;
