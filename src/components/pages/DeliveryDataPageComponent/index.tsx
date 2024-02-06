import AddButton from './_components/AddButton'
import DeliveryBlock from './_components/DeliveryBlock'

import RootIcon from '../../ui/icons/RootIcon'
import DefaultLink from '../../ui/links/DefaultLink'
import MainContainer from '../../ui/MainContainer'

import s from './DeliveryDataPageComponent.module.scss'

const DeliveryDataPageComponent = () => (
    <MainContainer className={s.wrapper}>
        <div className={s.header}>
            <DefaultLink href='/profile' className={s.link} aria-label='Назад'>
                <RootIcon name='arrowLeft' />
            </DefaultLink>
            <h1 className={s.title}>Данные доставки</h1>
        </div>
        <DeliveryBlock />
        <AddButton />
    </MainContainer>
)

export default DeliveryDataPageComponent
