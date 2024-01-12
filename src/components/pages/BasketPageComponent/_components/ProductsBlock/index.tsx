import { useState } from "react";

import { Button, Checkbox, CheckboxGroup, cn } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";

import HeartIcon from "@/src/components/ui/icons/HeartIcon";
import InViewWrapper from "@/src/components/ui/InViewWrapper";
import { useAppSelector } from "@/src/hooks/redux-hooks/redux-hooks";

import CountButton from "../CountButton";
import DeleteButton from "../DeleteButton";
import HeaderBlock from "../HeaderBlock";

import s from "./ProductsBlock.module.scss";

const ProductsBlock = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const carts = useAppSelector((state) => state.carts.data);

  console.log(carts)

  const totalPrice = carts
    .filter((cart) => selected.includes(cart.id.toString()))
    .reduce((acc, cart) => acc + cart.product.price * cart.count, 0).toFixed(0);
  const totalPriceWithDiscount = carts
    .filter((cart) => selected.includes(cart.id.toString()))
    .reduce((acc, cart) => acc + cart.product.price * cart.count * ((100 - cart.product.discount) / 100), 0).toFixed(0);

  return (
    <>
      <HeaderBlock selected={selected} setSelected={setSelected} />
      <CheckboxGroup className={s.wrapper} onValueChange={setSelected} value={selected}>
        {carts.map(({ id, size, count, product }, index) => (
          <InViewWrapper key={`${id}${size}`}>
            {({ isInView }) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index < 2 ? 0.1 * index : 0.15 }}
                className={s["checkbox-wrapper"]}
              >
                <Checkbox
                  aria-label={product.name}
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
                  value={`${id}`}
                >
                  <div className={s.header}>{product.name}</div>
                </Checkbox>
                <div className={s.footer}>
                  <HeartIcon productId={product.id} />
                  <DeleteButton id={id} selected={selected} setSelected={setSelected} />
                  <CountButton id={id} quantity={count} />
                </div>
              </motion.div>
            )}
          </InViewWrapper>
        ))}
      </CheckboxGroup>
      <div className={clsx(s.totalFooter, !!selected.length && s.visible)}>
        <div className={s.info}>
          <div className={s.title}>{new Intl.NumberFormat("ru-RU").format(+totalPriceWithDiscount)} ₽ со скидками</div>
          <div className={s.description}>{new Intl.NumberFormat("ru-RU").format(+totalPrice)} ₽</div>
        </div>
        <div className={s.buttonWrapper}>
          <Button className={s.button}>Оформить заказ</Button>
        </div>
      </div>
    </>
  );
};

export default ProductsBlock;
