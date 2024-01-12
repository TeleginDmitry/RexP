import { useState } from "react";

import { Button, Checkbox, Popover, PopoverContent, PopoverTrigger, cn } from "@nextui-org/react";
import clsx from "clsx";

import s from "./HeaderBlock.module.scss";

interface HeaderBlockProps {
  selected: string[];
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({  selected }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // const onHandleClick = () => {
  //   if (!basketValue) {
  //     return;
  //   }

  //   const products = JSON.parse(basketValue) as Array<{ id: string; size: string; quantity: number }>;
  //   const newProducts = products.filter((product) => !selected.includes(`${product.id}-${product.size}`));

  //   setBasketValue(JSON.stringify(newProducts));
  //   setSelected(selected.filter((item) => newProducts.find((product) => item === `${product.id}-${product.size}`)));
  // };

  // useEffect(() => {
  //   if (basketValue) {
  //     setIsSelected(JSON.parse(basketValue).length === selected.length);
  //   }
  // }, [selected, basketValue, isSelected]);

  // useEffect(() => {
  //   if (basketValue) {
  //     if (JSON.parse(basketValue).length === 0) {
  //       setIsSelected(false);
  //     }
  //   }
  // }, [basketValue, isSelected]);

  // const onHandleAllClick = () => {
  //   setIsSelected(!isSelected);
  //   setSelected(isSelected ? [] : JSON.parse(basketValue).map(({ id, size }) => `${id}-${size}`));
  // };

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
        // onValueChange={onHandleAllClick}
      >
        <div className={s.header}>выбрать&nbsp;все</div>
      </Checkbox>
      <Popover isOpen={isOpen} onOpenChange={(open) => selected.length !== 0 && setIsOpen(open)}>
        <PopoverTrigger>
          <Button className={s.button} disabled={selected.length === 0}>
            Удалить выбранные
          </Button>
        </PopoverTrigger>
        <PopoverContent className={s.popover}>
          <div className={clsx("px-1 py-2", s.content)}>
            <div className="text-small font-bold">
              Вы точно хотите удалить <br /> выбранные товары?
            </div>
            <div className={s.buttons}>
              <Button
                className={clsx("text-small font-bold", s.button)}
                onClick={() => {
                  // onHandleClick();
                  setIsOpen(false);
                }}
              >
                Да
              </Button>
              <Button className={clsx("text-small font-bold", s.button)} onClick={() => setIsOpen(false)}>
                Нет
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderBlock;
