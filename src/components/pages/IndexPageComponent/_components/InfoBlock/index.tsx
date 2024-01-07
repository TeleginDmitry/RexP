import RootIcon from "@/src/components/ui/icons/RootIcon";
import DefaultLink from "@/src/components/ui/links/DefaultLink";
import RootText from "@/src/components/ui/RootText";

import s from "./InfoBlock.module.scss";

// TODO: add href to links
const InfoBlock = () => (
  <div className={s.wrapper}>
    <DefaultLink className={s.helper} href="/">
      <div className={s.avatar}>Rex</div>
      <div className={s.text}>
        <RootText variant="16px" color="black" className={s["text-top"]}>
          Мой&nbsp;помощник
        </RootText>
        <RootText variant="10px" color="secondGrey">
          всегда&nbsp;на&nbsp;связи
        </RootText>
      </div>
    </DefaultLink>
    <DefaultLink className={s.telegram} href="/">
      <RootIcon name="tg" />
      <div className={s["telegram-text"]}>
        <div className={s["telegram-text-top"]}>@poizonrex</div>
        <RootText variant="10px" color="secondGrey">
          с&nbsp;тебя&nbsp;подписка
        </RootText>
      </div>
    </DefaultLink>
  </div>
);

export default InfoBlock;
