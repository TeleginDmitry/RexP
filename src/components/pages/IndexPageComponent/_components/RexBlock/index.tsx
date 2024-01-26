import Image from "next/image";
import Link from "next/link";

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

    <Link href="/search" className="absolute top-0 left-0 w-full h-full z-10" />
  </div>
);

export default RexBlock;
