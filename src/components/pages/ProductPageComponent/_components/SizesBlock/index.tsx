import RootTabs from "@/src/components/ui/RootTabs";

import s from "./SizesBlock.module.scss";

const SizesBlock = () => (
  <div className={s.wrapper}>
    <div className={s.header}>
      <div className={s["left-text"]}>Размер</div>
      <div className={s["right-text"]}>Размерная сетка</div>
    </div>
    <RootTabs
      tabsList={["36", "36,5", "37", "37,5", "38", "38,5", "39", "39,5", "40", "41", "42"]}
      variant="bordered"
    />
  </div>
);

export default SizesBlock;
