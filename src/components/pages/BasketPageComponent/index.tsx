/* eslint-disable no-param-reassign */
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import image from 'public/images/global/image2.png'

import { FilterBlock } from './_components/FilterBlock/FilterBlock'
import ProductsBlock from './_components/ProductsBlock'

import MainContainer from '../../ui/MainContainer'
import SpecificBlock from '../../ui/SpecificBlock/SpecificBlock'

import s from './BasketPageComponent.module.scss'

const BasketPageComponent = () => {
    const filters = useAppSelector((state) => state.filter)
    const carts = useAppSelector((state) => state.carts.data)

    const countActiveFilters = [
        filters.brands.length === 0,
        filters.sizes.length === 0,
        filters.minPrice === 99 && filters.maxPrice === 3599999,
        filters.orderBy === 'id' && filters.sortBy === 'DESC',
        filters.categoryId === 0 && filters.subCategories.length === 0
    ].reduce((acc, condition) => {
        if (!condition) {
            acc++
        }

        return acc
    }, 0)

    return (
        <MainContainer className={s.wrapper}>
            <div className='pb-[65px]'>
                {!!carts.length || !!countActiveFilters ? (
                    <>
                        <FilterBlock />
                        <ProductsBlock />
                    </>
                ) : (
                    <SpecificBlock
                        imageUrl={image.src}
                        text='Воспользуйся каталогом или поиском для выбора товаров'
                        title='Твоя корзина пуста'
                    />
                )}
            </div>
        </MainContainer>
    )
}

export default BasketPageComponent
