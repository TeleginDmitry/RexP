/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col items-center gap-2 pt-4'>
            <Image
                src='/images/global/not_found.png'
                alt='Картинка не найдена'
                width={300}
                height={300}
                className='w-full'
            />
            <p className='font-semibold text-xl text-center'>
                Твоя корзина пуста
            </p>

            <span className='text-base text-[rgba(60,60,67,0.6)] text-center'>
                Воспользуйся каталогом или поиском для выбора товаров
            </span>

            <Link
                href='/'
                className='font-bold text-base text-white py-3 px-8 rounded-xl bg-black mt-3'
            >
                Перейти в каталог
            </Link>
        </div>
    )
}
