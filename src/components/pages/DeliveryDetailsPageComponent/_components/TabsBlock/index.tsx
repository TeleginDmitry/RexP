import RootTabs from "@/src/components/ui/RootTabs";
import { DELIVERY_TYPES } from "@/src/constants";
import { useAppDispatch } from "@/src/hooks/redux-hooks/redux-hooks";
import { setActiveFilter } from "@/src/store/slices/filters";

import s from "./TabsBlock.module.scss";

const TabsBlock = () => {
  const dispatch = useAppDispatch();

  const onHandleChange = (value: string) => dispatch(setActiveFilter({ value, filterName: "deliveryDetailsPage" }));

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Способ получения</div>
      <RootTabs
        className={s.tabs}
        tabsList={[DELIVERY_TYPES.PICK, DELIVERY_TYPES.COURIER]}
        onSelectionChange={onHandleChange}
      />
    </div>
  );
};

export default TabsBlock;
