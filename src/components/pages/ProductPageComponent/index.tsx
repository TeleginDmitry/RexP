import AccordionBlock from './_components/AccordionBlock'
import AddButton from './_components/AddButton'
import InfoBlock from './_components/InfoBlock'
import SizesBlock from './_components/SizesBlock'
import SliderBlock from './_components/SliderBlock'

import MainContainer from '../../ui/MainContainer'

import s from './ProductPageComponent.module.scss'

const ProductPageComponent = () => (
    <MainContainer className={s.wrapper}>
        <SliderBlock />
        <InfoBlock />
        <SizesBlock />
        <AccordionBlock />
        <AddButton />
    </MainContainer>
)

export default ProductPageComponent
