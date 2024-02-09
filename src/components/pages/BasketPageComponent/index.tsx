import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import { FilterBlock } from './_components/FilterBlock/FilterBlock'
import NotFound from './_components/NotFound/NotFound'
import ProductsBlock from './_components/ProductsBlock'

import MainContainer from '../../ui/MainContainer'

import s from './BasketPageComponent.module.scss'

const BasketPageComponent = () => {
    const carts = useAppSelector((state) => state.carts.data)

    return (
        <MainContainer className={s.wrapper}>
            {carts.length ? (
                <>
                    <FilterBlock />
                    <ProductsBlock />
                </>
            ) : (
                <NotFound />
            )}
        </MainContainer>
    )
}

export default BasketPageComponent
