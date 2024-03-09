import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import image from 'public/images/global/image3.avif'

import { FilterBlock } from './_components/FilterBlock/FilterBlock'

import CatalogSpacer from '../../ui/CatalogSpacer'
import MainContainer from '../../ui/MainContainer'
import ProductCard from '../../ui/ProductCard'
import SpecificBlock from '../../ui/SpecificBlock/SpecificBlock'

import s from './FavouritesPageComponent.module.scss'

const FavouritesPageComponent = () => {
    const favorites = useAppSelector((state) => state.favorites.data)

    return (
        <MainContainer className={s.page}>
            {favorites.length ? (
                <>
                    <FilterBlock />
                    <CatalogSpacer>
                        {favorites.map(({ product, price }, index) => (
                            <ProductCard
                                id={product.id}
                                key={product.id}
                                name={product.name}
                                price={price}
                                imgUrl={product.images[0].name}
                                imagePriority={index < 3}
                                outOfStock={false}
                                isOuter={product.isOuter}
                            />
                        ))}
                    </CatalogSpacer>
                </>
            ) : (
                <SpecificBlock
                    imageUrl={image.src}
                    text='Воспользуйся каталогом или поиском для выбора товаров'
                    title='У тебя нет избранных товаров'
                />
            )}
        </MainContainer>
    )
}

export default FavouritesPageComponent
