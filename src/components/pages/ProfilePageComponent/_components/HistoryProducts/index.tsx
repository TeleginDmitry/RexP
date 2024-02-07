import ScrollContainer from 'react-indiana-drag-scroll'

import ProductCard from '@/src/components/ui/ProductCard'
import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

import s from './HistoryProducts.module.scss'

const HistoryProducts = () => {
    const viewed = useAppSelector((state) => state.viewed.data)
    const products = useAppSelector((state) => state.products.data)

    return (
        <>
            <div className={s['history-text']}>Вы смотрели</div>
            <ScrollContainer className={s.wrapper}>
                {viewed.map(({ productId }, index) => {
                    const product = products.find(
                        (productValue) => productValue.id === +productId
                    )

                    return (
                        product && (
                            <ProductCard
                                id={product.id}
                                variant='small'
                                key={product.id}
                                name={product.name}
                                price={product.productSizes[0].price}
                                imgUrl={product.images[0].name}
                                imagePriority={index < 3}
                                outOfStock={false}
                                isOuter={product.isOuter}
                            />
                        )
                    )
                })}
            </ScrollContainer>
        </>
    )
}

export default HistoryProducts
