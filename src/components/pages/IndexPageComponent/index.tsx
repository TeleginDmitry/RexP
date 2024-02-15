import InfoBlock from './_components/InfoBlock'
import ProductsBlock from './_components/ProductsBlock'
import RexBlock from './_components/RexBlock'
import { SearhBlock } from './_components/SearchBlock'
import { StoriesBlock } from './_components/StoriesBlock'
import TabsBlock from './_components/TabsBlock'

import MainContainer from '../../ui/MainContainer'

import s from './IndexPageComponent.module.scss'

const IndexPageComponent = () => (
    <MainContainer className={s.page}>
        <InfoBlock />
        <SearhBlock />
        <StoriesBlock />
        <RexBlock />
        <TabsBlock />
        <ProductsBlock />
    </MainContainer>
)
export default IndexPageComponent
