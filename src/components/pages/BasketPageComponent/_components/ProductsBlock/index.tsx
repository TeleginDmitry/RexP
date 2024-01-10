import { useLocalStorage } from "@mantine/hooks";
import { Checkbox, cn } from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";

import HeartIcon from "@/src/components/ui/icons/HeartIcon";
import InViewWrapper from "@/src/components/ui/InViewWrapper";
import { PRODUCTS, PRODUCTS_IN_BASKET_LS_KEY } from "@/src/constants";
import useClientSide from "@/src/hooks/useClientSide";

import s from "./ProductsBlock.module.scss";

const ProductsBlock = () => {
  const isClient = useClientSide();
  const [basketValue] = useLocalStorage({
    key: PRODUCTS_IN_BASKET_LS_KEY,
    defaultValue: "",
  });

  if (!isClient) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      {basketValue &&
        JSON.parse(basketValue).map(({ id, size, quantity }, index) => {
          const product = PRODUCTS.find((productValue) => productValue.id === +id);

          if (!product) {
            return null;
          }

          return (
            <InViewWrapper key={id}>
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
                    <HeartIcon productId={id} />
                  </div>
                </motion.div>
              )}
            </InViewWrapper>
          );
        })}
    </div>
  );
};

export default ProductsBlock;
