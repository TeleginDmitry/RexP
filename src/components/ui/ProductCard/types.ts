export interface ProductCardProps {
    className?: string
    outOfStock?: boolean
    price: number | string
    name: string
    isOuter: boolean
    imgUrl: string
    id: number | string
    imagePriority?: boolean
    variant?: 'default' | 'small'
}
