import RootTabs from "@/src/components/ui/RootTabs";
import { DELIVERY_TYPES } from "@/src/constants";

import s from "./TabsBlock.module.scss";

interface Props {
  changeActiveTab: (tab: "Курьером" | "Пункт выдачи заказа") => void;
  activeTab: "Курьером" | "Пункт выдачи заказа";
}

const TabsBlock = ({ changeActiveTab, activeTab }: Props) => {
  const onHandleChange = (value: string) => changeActiveTab(value as "Курьером" | "Пункт выдачи заказа");

  return (
    <div className={`${s.wrapper} mt-10`}>
      <div className={s.title}>Способ получения</div>
      <RootTabs
        className={s.tabs}
        selectedKey={activeTab}
        tabsList={[DELIVERY_TYPES.PICK, DELIVERY_TYPES.COURIER]}
        onSelectionChange={onHandleChange}
      />
    </div>
  );
};

export default TabsBlock;
