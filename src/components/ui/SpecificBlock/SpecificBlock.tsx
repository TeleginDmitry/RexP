/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    imageUrl: string
    title: string
    text: string
    linkText?: string
    positionImage?: 'bottom' | 'top'
}
export default function SpecificBlock({
    imageUrl,
    text,
    title,
    linkText = 'Перейти в каталог',
    positionImage = 'top'
}: Props) {
    return (
        <div className='flex flex-col items-center gap-2 pt-4'>
            {positionImage === 'top' && (
                <Image
                    src={imageUrl}
                    alt='Картинка не найдено'
                    width={1000}
                    height={300}
                    className='w-full'
                />
            )}

            <p className='font-semibold text-xl text-center'>{title}</p>

            <span className='text-base text-[rgba(60,60,67,0.6)] text-center'>
                {text}
            </span>

            {positionImage === 'bottom' && (
                <Image
                    src={imageUrl}
                    alt='Картинка не найдено'
                    width={1000}
                    height={300}
                    className='w-full'
                />
            )}

            {linkText && (
                <Link
                    href='/'
                    className='font-bold text-base text-white py-3 px-8 rounded-xl bg-black mt-3'
                >
                    {linkText}
                </Link>
            )}
        </div>
    )
}
