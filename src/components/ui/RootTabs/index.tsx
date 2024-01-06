import type { TabsProps } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import clsx from "clsx";

import s from "./RootTabs.module.scss";

interface RootTabsProps extends TabsProps {
  tabsList: string[];
}

const RootTabs: React.FC<RootTabsProps> = ({ tabsList, ...props }) => (
  <Tabs
    onSelectionChange={(event) => console.log(event)}
    aria-label="Options"
    color="primary"
    variant="light"
    classNames={{
      tabList: s.tabList,
      cursor: s.cursor,
      tab: clsx("max-w-fit px-[12px] h-[28px]", s.tab),
      tabContent: s.tabContent,
      base: s.base,
    }}
    {...props}
  >
    {tabsList.map((text) => (
      <Tab key={text} className={s.tab} title={<div>{text}</div>} />
    ))}
  </Tabs>
);

export default RootTabs;
