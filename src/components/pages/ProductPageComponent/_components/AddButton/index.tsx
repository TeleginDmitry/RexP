import RootButton from "@/src/components/ui/RootButton";

import s from "./AddButton.module.scss";

const AddButton = () => (
  <div className={s.wrapper}>
    <RootButton className={s.button}>Добавить в корзину</RootButton>
  </div>
);

export default AddButton;
