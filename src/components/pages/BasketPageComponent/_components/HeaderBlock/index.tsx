import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { Button, Checkbox, Popover, PopoverContent, PopoverTrigger, cn } from "@nextui-org/react";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";
import { deleteCartFromStore } from "@/src/store/slices/getCarts";
import { deleteCart } from "@/src/utils/api/deleteCart";

import s from "./HeaderBlock.module.scss";

interface HeaderBlockProps {
  setSelected: Dispatch<SetStateAction<string[]>>;
  selected: string[];
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ selected, setSelected }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const carts = useAppSelector((state) => state.carts.data);
  const dispatch = useAppDispatch();

  const onHandleClick = () => {
    selected.forEach((id) => {
      deleteCart(id).then(() => {
        dispatch(deleteCartFromStore({ id: +id }));
      });
    });
  };

  useEffect(() => {
    if (carts.length === 0) {
      setIsSelected(false);
      return;
    }
    setIsSelected(carts.length === selected.length);
  }, [carts.length, selected.length]);

  const onHandleAllClick = () => {
    setIsSelected(!isSelected);
    setSelected(isSelected ? [] : carts.map(({ id }) => `${id}`));
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
        onValueChange={onHandleAllClick}
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
                  onHandleClick();
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
