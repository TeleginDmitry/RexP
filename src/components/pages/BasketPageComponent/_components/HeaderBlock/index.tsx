import { useState, type Dispatch, type SetStateAction, useEffect } from "react";

import { Button, Checkbox, Popover, PopoverContent, PopoverTrigger, cn } from "@nextui-org/react";
import clsx from "clsx";

import s from "./HeaderBlock.module.scss";

interface HeaderBlockProps {
  setBasketValue: (val: string | ((prevState: string) => string)) => void;
  setSelected: Dispatch<SetStateAction<string[]>>;
  basketValue: string;
  selected: string[];
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ setSelected, basketValue, setBasketValue, selected }) => {
  const [isSelected, setIsSelected] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (basketValue) {
      setSelected(isSelected ? JSON.parse(basketValue).map(({ id, size }) => `${id}-${size}`) : []);
    }
  }, [basketValue, isSelected]);

  const onHandleClick = () => {
    if (!basketValue) {
      return;
    }

    const products = JSON.parse(basketValue) as Array<{ id: string; size: string; quantity: number }>;
    const newProducts = products.filter((product) => !selected.includes(`${product.id}-${product.size}`));

    setBasketValue(JSON.stringify(newProducts));
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
      <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <Button className={s.button}>Удалить выбранные</Button>
        </PopoverTrigger>
        <PopoverContent className={s.popover}>
          <div className={clsx("px-1 py-2", s.content)}>
            <div className="text-small font-bold">
              Вы точно хотите удалить <br />
              выбранные товары?
            </div>
            <Button
              className={clsx("text-small font-bold", s.button)}
              onClick={() => {
                onHandleClick();
                setIsOpen(false);
              }}
            >
              Да
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderBlock;
