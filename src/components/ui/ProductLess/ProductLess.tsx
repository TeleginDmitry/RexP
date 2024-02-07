/* eslint-disable no-restricted-globals */
/* eslint-disable react/function-component-definition */
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    id: number
    images: Array<{
        name: string
        id: number
    }> | null
    name: string
    price: number
    sizeName: string
    isOuter: boolean
}

export default function ProductLess({
    id,
    images,
    name,
    price,
    sizeName,
    isOuter
}: Props) {
    return (
        <div className='relative flex gap-4 bg-white p-3 rounded-xl' key={id}>
            <Link
                href={`/catalog/${id}`}
                className='absolute top-0 left-0 w-full h-full z-10'
            />
            {images && images[0] && (
                <Image
                    width={100}
                    height={70}
                    src={
                        isOuter
                            ? images[0].name
                            : `${process.env.NEXT_PUBLIC_IMAGES_URL}${images[0].name}`
                    }
                    alt={name}
                />
            )}
            <div className='flex flex-col'>
                <span className='text-sm font-bold'>
                    {new Intl.NumberFormat('ru-RU').format(price)} ₽
                </span>
                <div className='flex flex-col gap-1'>
                    <span className='text-xs overflow-hidden line-clamp-3 text-black'>
                        {name}
                    </span>
                    <span className='text-[#8E8E8E] text-xs'>
                        размер: {sizeName}
                    </span>
                </div>
            </div>
        </div>
    )
}
