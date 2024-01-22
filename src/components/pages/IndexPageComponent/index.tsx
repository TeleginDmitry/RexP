import { useFilter } from "@/src/hooks/useFilter";

import InfoBlock from "./_components/InfoBlock";
import ProductsBlock from "./_components/ProductsBlock";
import RexBlock from "./_components/RexBlock";
import { SearhBlock } from "./_components/SearchBlock";
import TabsBlock from "./_components/TabsBlock";

import MainContainer from "../../ui/MainContainer";

import s from "./IndexPageComponent.module.scss";

const IndexPageComponent = () => {
  const { changeFilters, filters, isOpen, toggleOpen } = useFilter();

  return (
    <MainContainer className={s.page}>
      <InfoBlock />
      <SearhBlock changeFilters={changeFilters} filters={filters} isOpen={isOpen} toggleOpen={toggleOpen} />
      <RexBlock />
      <TabsBlock changeFilters={changeFilters} filters={filters} />
      <ProductsBlock />
    </MainContainer>
  );
};
export default IndexPageComponent;
