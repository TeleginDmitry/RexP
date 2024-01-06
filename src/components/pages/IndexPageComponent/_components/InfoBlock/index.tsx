import RootIcon from "@/src/components/ui/RootIcon";
import RootText from "@/src/components/ui/RootText";

import s from "./InfoBlock.module.scss";

const InfoBlock = () => (
  <div className={s.wrapper}>
    <div className={s.helper}>
      <div className={s.avatar}>Rex</div>
      <div className={s.text}>
        <RootText variant="16px" color="black" className={s["text-top"]}>
          Мой помощник
        </RootText>
        <RootText variant="10px" color="secondGrey">
          всегда на связи
        </RootText>
      </div>
    </div>
    <div className={s.telegram}>
      <RootIcon name="tg" />
      <div className={s["telegram-text"]}>
        <div className={s["telegram-text-top"]}>@poizonrex</div>
        <RootText variant="10px" color="secondGrey">
          с тебя подписка
        </RootText>
      </div>
    </div>
  </div>
);

export default InfoBlock;
