import OrdersBlock from "./_componnets/OrdersBlock";
import TabsBlock from "./_componnets/TabsBlock";

import MainContainer from "../../ui/MainContainer";

const DeliveryPageComponent = () => (
  <MainContainer>
    <TabsBlock />
    <OrdersBlock />
  </MainContainer>
);

export default DeliveryPageComponent;
