import RootIcon from "@/src/components/ui/icons/RootIcon";
import DefaultLink from "@/src/components/ui/links/DefaultLink";
import RootTabs from "@/src/components/ui/RootTabs";

import s from "./TabsBlock.module.scss";

const TabsBlock = () => (
  <>
    <div className={s.header}>
      <DefaultLink href="/profile" className={s.link} aria-label="Назад">
        <RootIcon name="arrowLeft" />
      </DefaultLink>
      <h1 className={s.title}>Мои заказы</h1>
    </div>
    <div className={s.wrapper}>
      <div className={s.tabs}>
        <RootTabs tabsList={["В доставке", "Ждут оплаты", "Завершенные"]} />
      </div>
    </div>
  </>
);

export default TabsBlock;
