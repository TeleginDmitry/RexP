import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import AccordionBlock from './_components/AccordionBlock'
import AddButton from './_components/AddButton'
import InfoBlock from './_components/InfoBlock'
import SizesBlock from './_components/SizesBlock'
import { ProductSkeleton } from './_components/Skeleton'
import SliderBlock from './_components/SliderBlock'

import MainContainer from '../../ui/MainContainer'

import s from './ProductPageComponent.module.scss'

const ProductPageComponent = () => {
    const isLoading = useAppSelector((state) => state.product.isLoading)

    if (isLoading) {
        return (
            <div className='w-full px-4'>
                <ProductSkeleton />
            </div>
        )
    }

    return (
        <MainContainer className={s.wrapper}>
            <SliderBlock />
            <InfoBlock />
            <SizesBlock />
            <AccordionBlock />
            <AddButton />
        </MainContainer>
    )
}

export default ProductPageComponent
