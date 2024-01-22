import Image from "next/image";
import Link from "next/link";

import rex from "@/public/images/indexPage/rex.webp";

import s from "./RexBlock.module.scss";

const RexBlock = () => (
  <div className={s.wrapper}>
    <div className={s.text}>
      <div className={s["text-top"]}>
        Rex <br />
        найдёт
      </div>
      <div className={s["text-bottom"]}>
        любой товар <br /> по ссылке из Poizon
      </div>
    </div>
    <Image src={rex} alt="Rex найдёт" width={134} height={134} quality={100} className={s.image} priority />

    <Link href="/search" className="absolute top-0 left-0 w-full h-full z-10" />
  </div>
);

export default RexBlock;
