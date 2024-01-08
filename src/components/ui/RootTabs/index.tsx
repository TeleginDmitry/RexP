import type { TabsProps } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import clsx from "clsx";

import s from "./RootTabs.module.scss";

interface RootTabsProps extends Omit<TabsProps, "variant"> {
  tabsList: string[];
  disabledList?: string[];
  variant?: "bordered" | "default";
}

const RootTabs: React.FC<RootTabsProps> = ({ tabsList, classNames, variant = "default", disabledList, ...props }) => (
  <Tabs
    onSelectionChange={(event) => console.log(event)}
    aria-label="Options"
    color="primary"
    variant="light"
    disabledKeys={disabledList}
    classNames={{
      ...classNames,
      tabList: clsx(s.tabList, classNames?.tabList),
      cursor: clsx(s.cursor, classNames?.cursor),
      tab: clsx("max-w-fit px-[12px] h-[28px]", s.tab, classNames?.tab),
      tabContent: clsx(s.tabContent, classNames?.tabContent),
      base: clsx(s.base, classNames?.base, s[variant]),
    }}
    {...props}
  >
    {tabsList.map((text) => (
      <Tab key={text} className={clsx(s.tab, disabledList?.includes(text) && s.disabled)} title={<div>{text}</div>} />
    ))}
  </Tabs>
);

export default RootTabs;
