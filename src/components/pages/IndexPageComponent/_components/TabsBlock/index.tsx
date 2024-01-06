import RootButton from "@/src/components/ui/RootButton";
import RootIcon from "@/src/components/ui/RootIcon";
import RootTabs from "@/src/components/ui/RootTabs";

import s from "./TabsBlock.module.scss";

const TabsBlock = () => (
  <div className={s.wrapper}>
    <RootTabs tabsList={["Все товары", "Кроссовки", "Верхняя одежда"]} defaultSelectedKey="Все товары" />
    <RootButton className={s.button}>
      Все <RootIcon name="arrow" />
    </RootButton>
  </div>
);

export default TabsBlock;
