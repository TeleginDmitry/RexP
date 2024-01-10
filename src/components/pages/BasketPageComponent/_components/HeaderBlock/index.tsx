import { useState, type Dispatch, type SetStateAction, useEffect } from "react";

import { Button, Checkbox, cn } from "@nextui-org/react";
import clsx from "clsx";

import s from "./HeaderBlock.module.scss";

interface HeaderBlockProps {
  setBasketValue: (val: string | ((prevState: string) => string)) => void;
  setSelected: Dispatch<SetStateAction<string[]>>;
  basketValue: string;
  selected: string[];
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ setSelected, basketValue, setBasketValue, selected }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setSelected(isSelected ? JSON.parse(basketValue).map(({ id, size }) => `${id}-${size}`) : []);
  }, [basketValue, isSelected]);

  const onHandleClick = () => {
    if (!basketValue) {
      return;
    }

    const products = JSON.parse(basketValue) as Array<{ id: string; size: string; quantity: number }>;
    const newProducts = products.filter((product) => !selected.includes(`${product.id}-${product.size}`));

    setBasketValue(JSON.stringify(newProducts));
    setIsSelected(false);
  };

  return (
    <div className={s.wrapper}>
      <Checkbox
        aria-label="выбрать все"
        radius="full"
        size="lg"
        classNames={{
          base: clsx(
            cn(
              "inline-flex max-w-md w-full m-0",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-[0px] gap-2 p-[0px]  border-transparent",
              "data-[selected=true]:border-primary"
            ),
            s.checkbox
          ),
          label: "w-[calc(100%_-_74px)]",
        }}
        value="выбрать все"
        isSelected={isSelected}
        onValueChange={setIsSelected}
      >
        <div className={s.header}>выбрать&nbsp;все</div>
      </Checkbox>
      <Button className={s.button} onClick={onHandleClick}>
        Удалить выбранные
      </Button>
    </div>
  );
};

export default HeaderBlock;
