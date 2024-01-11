import { useLocalStorage } from "@mantine/hooks";

import { ADDRESSES_LS_KEY } from "@/src/constants";

import s from "./DeliveryBlock.module.scss";

const DeliveryBlock = () => {
  const [addressesValue] = useLocalStorage({ key: ADDRESSES_LS_KEY, defaultValue: "" });

  return (
    <div className={s.wrapper}>
      {addressesValue &&
        JSON.parse(addressesValue).map(({ id }) => (
          <div className={s.address} key={id}>
            id: {id}
          </div>
        ))}
    </div>
  );
};

export default DeliveryBlock;
