import { useState } from "react";

import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";

import HeartIcon from "../icons/HeartIcon";
import type { ProductCardProps } from "./types";

import DefaultLink from "../links/DefaultLink";

import s from "./ProductCard.module.scss";

const ProductCard: React.FC<ProductCardProps> = ({ className, name, id, imgUrl, imagePriority, price, liked }) => {
  const [isLiked, setIsLiked] = useState(liked);

  const onHandleClick = () => {
    setIsLiked(!isLiked);

    // TODO: Add to favourites or remove
  };

  return (
    <div className={clsx(s.wrapper, className)}>
      <div className={s.image}>
        <Image src={imgUrl} alt={name} width={145} height={107} priority={imagePriority} />
      </div>
      <div className={s.content}>
        <div className={s.info}>
          <div className={s.price}>{price} ₽</div>
          <div className={s.name}>{name} </div>
        </div>
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10"
          radius="full"
          variant="light"
          aria-label="Добавить в избранное"
          onClick={onHandleClick}
        >
          <HeartIcon liked={isLiked} />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
