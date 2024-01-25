import RootTabs from "@/src/components/ui/RootTabs";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { setActiveFilter } from "@/src/store/slices/filters";

import s from "./SizesBlock.module.scss";

const SizesBlock = () => {
  const sizes = useAppSelector((state) => state.product.data.productSizes);
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
        tabsList={sizes.map(({ size }) => size.name)}
        disabledList={[]}
        variant="bordered"
      />
    </div>
  );
};
export default SizesBlock;
