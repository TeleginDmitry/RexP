import HistoryProducts from './_components/HistoryProducts'
import InfoTabs from './_components/InfoTabs'
import UserInfo from './_components/UserInfo'

import DefaultLink from '../../ui/links/DefaultLink'
import MainContainer from '../../ui/MainContainer'

import s from './ProfilePageComponent.module.scss'

const ProfilePageComponent = () => (
    <MainContainer className={s.wrapper}>
        <UserInfo />
        <InfoTabs />
        <HistoryProducts />
        <DefaultLink className={s.info} href='/offerTerms'>
            Условия публичной оферты
        </DefaultLink>
    </MainContainer>
)

export default ProfilePageComponent
