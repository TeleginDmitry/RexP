import { useRouter } from "next/router";

import s from "./OrderPageComponent.module.scss";

const OrderPageComponent = () => {
  const router = useRouter();

  return <div className={s[""]}>id: {router.query.id}</div>;
};

export default OrderPageComponent;
