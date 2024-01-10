import RootTabs from "@/src/components/ui/RootTabs";
import { useAppDispatch } from "@/src/hooks/redux-hooks/redux-hooks";
import { setActiveFilter } from "@/src/store/slices/filters";

import s from "./SizesBlock.module.scss";

const SizesBlock = () => {
  const dispatch = useAppDispatch();

  const handleTabChange = (value: string) => dispatch(setActiveFilter({ value, filterName: "sizes" }));

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s["left-text"]}>Размер</div>
        <div className={s["right-text"]}>Размерная сетка</div>
      </div>
      <RootTabs
        onSelectionChange={handleTabChange}
        tabsList={["36", "36,5", "37", "37,5", "38", "38,5", "39", "39,5", "40", "41", "42"]}
        disabledList={["37", "41", "42"]}
        variant="bordered"
      />
    </div>
  );
};
export default SizesBlock;
