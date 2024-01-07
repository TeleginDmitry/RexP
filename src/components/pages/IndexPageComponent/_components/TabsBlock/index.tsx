import RootIcon from "@/src/components/ui/icons/RootIcon";
import RootButton from "@/src/components/ui/RootButton";
import RootTabs from "@/src/components/ui/RootTabs";
import { useAppDispatch } from "@/src/hooks/redux-hooks/redux-hooks";
import { setActiveFilter } from "@/src/store/slices/filters";

import s from "./TabsBlock.module.scss";

const TabsBlock = () => {
  const dispatch = useAppDispatch();
  const onHandleChange = (value: string) => dispatch(setActiveFilter({ value, filterName: "indexPage" }));

  return (
    <div className={s.wrapper}>
      <RootTabs
        tabsList={["Все товары", "Кроссовки", "Верхняя одежда"]}
        defaultSelectedKey="Все товары"
        onSelectionChange={onHandleChange}
      />
      <RootButton className={s.button}>
        Все <RootIcon name="arrow" />
      </RootButton>
    </div>
  );
};

export default TabsBlock;
