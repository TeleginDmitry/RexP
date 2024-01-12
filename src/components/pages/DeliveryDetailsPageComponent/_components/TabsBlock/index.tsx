import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import RootTabs from "@/src/components/ui/RootTabs";
import { DELIVERY_TYPES } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { setActiveFilter } from "@/src/store/slices/filters";

import s from "./TabsBlock.module.scss";

const TabsBlock = () => {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.filters.deliveryDetailsPage.activeFilter);
  const router = useRouter();

  const onHandleChange = (value: string) => dispatch(setActiveFilter({ value, filterName: "deliveryDetailsPage" }));

  useEffect(() => {
    if (router.query.type) {
      console.log(router.query.type);
      dispatch(setActiveFilter({ value: router.query.type as string, filterName: "deliveryDetailsPage" }));
    }
  }, [dispatch, router.query]);

  useEffect(() => {
    console.log(activeFilter)
  }, [activeFilter])

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
