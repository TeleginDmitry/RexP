/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
import Image from 'next/image'

import { useAppSelector } from '@/src/hooks/redux-hooks/redux-hooks'

export default function NotFound() {
    const name = useAppSelector((state) => state.filter.name)

    if (!name) {
        return
    }

    return (
        <div className='flex flex-col items-center gap-2 pt-4'>
            <p className='font-semibold text-xl text-center'>
                По запросу «
                {name.length > 20 ? `${name.slice(0, 20)}...` : name}» ничего не
                найдено
            </p>

            <span className='text-base text-[rgba(60,60,67,0.6)] text-center'>
                Для поиска товара введи конкретное название бренда или модели.
                Например, Nike
            </span>

            <Image
                src='/images/global/not_found.png'
                alt='Картинка не найдена'
                width={300}
                height={300}
                className='w-full'
            />
        </div>
    )
}
