import RootTabs from '@/src/components/ui/RootTabs'
import { DELIVERY_TYPES } from '@/src/constants'
import type { DeliveryCreate } from '@/src/utils/api/DeliveryCartMethods'

import s from './TabsBlock.module.scss'

interface Props {
    onHandleChange: (value: Partial<DeliveryCreate>) => void
    activeTab: 'Курьером' | 'Пункт выдачи заказа'
}

const TabsBlock = ({ onHandleChange, activeTab }: Props) => {
    const handleChange = (value: string) =>
        onHandleChange({
            deliveryTypeId: value === DELIVERY_TYPES.PICK ? 1 : 2
        })

    return (
        <div className={`${s.wrapper} mt-10`}>
            <div className={s.title}>Способ получения</div>
            <RootTabs
                className={s.tabs}
                selectedKey={activeTab}
                tabsList={[DELIVERY_TYPES.PICK, DELIVERY_TYPES.COURIER]}
                onSelectionChange={handleChange}
            />
        </div>
    )
}

export default TabsBlock
