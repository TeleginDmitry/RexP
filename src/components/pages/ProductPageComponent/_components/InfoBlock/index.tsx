import { useRouter } from "next/router";

import HeartIcon from "@/src/components/ui/icons/HeartIcon";
import RootIcon from "@/src/components/ui/icons/RootIcon";
import DefaultLink from "@/src/components/ui/links/DefaultLink";

import s from "./InfoBlock.module.scss";

const InfoBlock = () => {
  const router = useRouter();

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s["price-block"]}>
          <div className={s.price}>17 525 ₽</div>
          <div className={s["old-price"]}>27 525 ₽</div>
        </div>
        <div className={s["actions-block"]}>
          <HeartIcon productId={router.query.id as string} />
          <DefaultLink aria-label="Ссылка на оригинальную страницу" href="/">
            <RootIcon name="link" />
          </DefaultLink>
        </div>
      </div>
      <div className={s.name}>adidas originals Samba rose</div>
    </div>
  );
};

export default InfoBlock;
