import { useEffect } from "react";

import { useRouter } from "next/router";

import RootTabs from "@/src/components/ui/RootTabs";
import { DELIVERY_TYPES } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { setActiveFilter } from "@/src/store/slices/filters";

import s from "./TabsBlock.module.scss";

const TabsBlock = () => {
  const activeFilter = useAppSelector((state) => state.filters.deliveryDetailsPage.activeFilter);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onHandleChange = (value: string) => dispatch(setActiveFilter({ value, filterName: "deliveryDetailsPage" }));

  useEffect(() => {
    if (router.query.typeId) {
      dispatch(
        setActiveFilter({
          value: +router.query.typeId === 0 ? DELIVERY_TYPES.COURIER : DELIVERY_TYPES.PICK,
          filterName: "deliveryDetailsPage",
        })
      );
    }
  }, [activeFilter, dispatch, router.query]);

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Способ получения</div>
      <RootTabs
        className={s.tabs}
        selectedKey={activeFilter}
        tabsList={[DELIVERY_TYPES.PICK, DELIVERY_TYPES.COURIER]}
        onSelectionChange={onHandleChange}
      />
    </div>
  );
};

export default TabsBlock;
