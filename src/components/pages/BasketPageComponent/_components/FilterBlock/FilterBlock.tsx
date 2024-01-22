/* eslint-disable react/jsx-no-bind */
import Image from "next/image";

import MainFilter from "@/src/components/layout/_components/MainFilter";
import { useFilter } from "@/src/hooks/useFilter";

export const FilterBlock = () => {
  const { changeFilters, filters, isOpen, toggleOpen } = useFilter();

  function applyFilters() {
    // dispatch(getProductsThunk({ filters }));
    toggleOpen();
  }

  return (
    <div className="flex items-center justify-between mb-2">
      <div />

      <button onClick={toggleOpen}>
        <Image src="/images/icons/filters.svg" width={25} height={25} alt="filters icon" />
      </button>

      {isOpen && (
        <MainFilter
          applyFilters={applyFilters}
          filters={filters}
          changeFilters={changeFilters}
          toggleOpen={toggleOpen}
        />
      )}
    </div>
  );
};
