import RootIcon from "@/src/components/ui/icons/RootIcon";
import RootButton from "@/src/components/ui/RootButton";
import RootTabs from "@/src/components/ui/RootTabs";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { getProductsThunk } from "@/src/store/slices/getProducts/getProducts/getProducts";
import type { FilterType } from "@/src/types/Filter/filter.types";

import s from "./TabsBlock.module.scss";

interface Props {
  filters: FilterType;
  changeFilters: (values: Partial<FilterType>) => void;
}

const TabsBlock = ({ changeFilters, filters }: Props) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.category.data);

  const onHandleChange = (value: string) => {
    const categoryId = categories.find(({ name }) => name === value)?.id;

    changeFilters({ categoryId });

    dispatch(getProductsThunk({ filters: { ...filters, categoryId } }));
  };
  return (
    <div className={s.wrapper}>
      <RootTabs
        tabsList={categories.map(({ name }) => name)}
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
