import { useEffect, useState } from "react";

import { useLocalStorage } from "@mantine/hooks";
import { Checkbox, CheckboxGroup, cn } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";

import HeartIcon from "@/src/components/ui/icons/HeartIcon";
import InViewWrapper from "@/src/components/ui/InViewWrapper";
import { PRODUCTS, PRODUCTS_IN_BASKET_LS_KEY } from "@/src/constants";
import useClientSide from "@/src/hooks/useClientSide";

import CountButton from "../CountButton";
import DeleteButton from "../DeleteButton";
import HeaderBlock from "../HeaderBlock";

import s from "./ProductsBlock.module.scss";

const ProductsBlock = () => {
  const isClient = useClientSide();
  const [basketValue, setBasketValue] = useLocalStorage({ key: PRODUCTS_IN_BASKET_LS_KEY, defaultValue: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (basketValue && isFirstRender) {
      setIsFirstRender(false);
      setSelected(JSON.parse(basketValue).map(({ id, size }) => `${id}-${size}`));
    }
  }, [basketValue, isFirstRender]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <HeaderBlock
        selected={selected}
        basketValue={basketValue}
        setSelected={setSelected}
        setBasketValue={setBasketValue}
      />
      <CheckboxGroup className={s.wrapper} onValueChange={setSelected} value={selected}>
        {basketValue &&
          JSON.parse(basketValue).map(({ id, size, quantity }, index) => {
            const product = PRODUCTS.find((productValue) => productValue.id === +id);

            if (!product) {
              return null;
            }

            return (
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
                      value={`${id}-${size}`}
                    >
                      <div className={s.header}>{product.name}</div>
                    </Checkbox>
                    <div className={s.footer}>
                      <HeartIcon productId={id} />
                      <DeleteButton id={id} size={size} selected={selected} setSelected={setSelected} />
                      <CountButton id={id} size={size} quantity={quantity} />
                    </div>
                  </motion.div>
                )}
              </InViewWrapper>
            );
          })}
      </CheckboxGroup>
    </>
  );
};

export default ProductsBlock;
