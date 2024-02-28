/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'

import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import RootIcon from '@/src/components/ui/icons/RootIcon'
import MainContainer from '@/src/components/ui/MainContainer'
import RootButton from '@/src/components/ui/RootButton'
import SpecificBlock from '@/src/components/ui/SpecificBlock/SpecificBlock'
import { getProductName } from '@/src/utils/api/getProductName'

import image from 'public/images/global/not_found.png'

const SearchPage = () => {
    const router = useRouter()

    const [isError, setIsError] = useState(false)
    const [value, setValue] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [isStatus, setIsStatus] = useState<'error' | 'success' | null>(null)

    function extractUrl(inputString: string) {
        const urlRegex = /(https?:\/\/[^\s]+)/g
        const matches = inputString.match(urlRegex)
        if (matches) {
            return matches[0]
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = event.target

        if (value.length + 1 < inputValue.length) {
            const newValue = extractUrl(inputValue)

            if (newValue) {
                setValue(newValue)
            }
        } else {
            setValue(inputValue)
        }

        setIsError(false)
    }

    async function onSubmit() {
        if (value.length === 0) {
            return
        }

        try {
            const product = await getProductName({ url: value })

            const { data } = product

            if (data) {
                router.push(`/catalog/${data.id}`)
            }
        } catch (error) {
            setIsStatus('error')
            setIsError(true)
        }
    }

    const handleClick = () => {
        if (value.length === 0) {
            setIsError(true)
            return
        }

        setIsError(false)

        onSubmit()
    }

    return (
        <>
            <Head>
                <title>title</title>
                <meta name='description' content='description' />
            </Head>

            <MainContainer>
                <div className='relative pb-[52px]'>
                    <div className='flex flex-col gap-4 overflow-y-auto grow'>
                        <div className='flex justify-between items-center gap-2'>
                            <RootButton
                                onClick={() => {
                                    if (isStatus === null) {
                                        router.back()
                                    } else {
                                        setIsStatus(null)
                                        setValue('')
                                        setIsError(false)
                                    }
                                }}
                            >
                                <RootIcon name='arrowLeft' />
                            </RootButton>
                            <p className='text-base text-black font-medium'>
                                Поиск товара из Poizon по ссылке
                            </p>
                            <div />
                        </div>
                        <input
                            onChange={handleChange}
                            className={`w-full bg-[#EEEEEE] p-3  rounded-2xl ${clsx(
                                {
                                    'placeholder:text-[#D50000]': isError
                                }
                            )}`}
                            type='text'
                            placeholder={
                                isActive
                                    ? ''
                                    : isError
                                    ? 'Вставьте ссылку на товар из Poizon*'
                                    : 'Ссылка товара из Poizon'
                            }
                            onFocus={() => setIsActive(true)}
                            onBlur={() => setIsActive(false)}
                            value={value}
                        />
                        {isStatus === null ? (
                            <div className='flex flex-col gap-3'>
                                <p className='text-base text-black font-medium'>
                                    Как скопировать ссылку из Poizon?
                                </p>

                                <div className='flex flex-col gap-3 pb-4 border-b border-solid border-[#EEEEEE]'>
                                    <div className='flex gap-3 items-center'>
                                        <span className='flex items-center justify-center bg-black text-white min-w-8 h-8 rounded-full'>
                                            1
                                        </span>
                                        <p className='text-base text-black cursor-pointer'>
                                            Скачайте приложение Poizon и{' '}
                                            <span className='text-[#8E8E8E] underline'>
                                                зарегистрируйтесь
                                            </span>
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-3 justify-center'>
                                        <Link
                                            href='https://apps.apple.com/ru/app/得物-得到运动x潮流x好物/id1012871328'
                                            className='border border-solid border-black rounded-lg w-full flex gap-3 items-center py-2 justify-center'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='20'
                                                height='24'
                                                viewBox='0 0 20 24'
                                                fill='none'
                                            >
                                                <path
                                                    d='M16.3632 12.763C16.3751 11.8431 16.6203 10.9411 17.0759 10.141C17.5315 9.34093 18.1828 8.6687 18.9691 8.18688C18.4696 7.47583 17.8106 6.89066 17.0444 6.47785C16.2783 6.06504 15.4261 5.83597 14.5556 5.80883C12.6987 5.61457 10.8985 6.91628 9.9522 6.91628C8.98762 6.91628 7.5307 5.82811 5.96183 5.86029C4.94705 5.89296 3.95806 6.18707 3.09123 6.71395C2.2244 7.24084 1.50929 7.98253 1.01558 8.86676C-1.12308 12.5572 0.472166 17.9808 2.52082 20.9639C3.54581 22.4246 4.74373 24.0562 6.31118 23.9984C7.84502 23.9349 8.41788 23.0235 10.2694 23.0235C12.1037 23.0235 12.6411 23.9984 14.2404 23.9616C15.8862 23.9349 16.9232 22.4944 17.9123 21.0198C18.6487 19.979 19.2154 18.8287 19.5914 17.6115C18.6352 17.2084 17.8191 16.5337 17.2451 15.6715C16.671 14.8093 16.3643 13.7978 16.3632 12.763Z'
                                                    fill='black'
                                                />
                                                <path
                                                    d='M13.3421 3.84712C14.2395 2.77342 14.6816 1.39335 14.5745 0C13.2035 0.14352 11.937 0.796599 11.0275 1.82911C10.5828 2.33352 10.2422 2.92033 10.0252 3.55601C9.8082 4.19169 9.71902 4.86376 9.76278 5.53381C10.4485 5.54084 11.127 5.3927 11.747 5.10054C12.367 4.80838 12.9123 4.37982 13.3421 3.84712Z'
                                                    fill='black'
                                                />
                                            </svg>
                                            <p className='text-xs text-black'>
                                                Скачать <br />
                                                из{' '}
                                                <span className='font-bold'>
                                                    App Store
                                                </span>
                                            </p>
                                        </Link>
                                        <Link
                                            href='https://play.google.com/store/apps/details?id=com.shizhuang.poizon.hk'
                                            className='border border-solid border-black rounded-lg w-full flex gap-3 items-center justify-center py-2'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='22'
                                                height='24'
                                                viewBox='0 0 22 24'
                                                fill='none'
                                            >
                                                <path
                                                    d='M10.0254 11.4621L0.0913086 22.0059C0.0916818 22.0081 0.0924282 22.0099 0.0928014 22.0121C0.397453 23.1569 1.44316 24 2.68425 24C3.18037 24 3.64616 23.8659 4.04562 23.6304L4.07734 23.6118L15.2594 17.1594L10.0254 11.4621Z'
                                                    fill='#EB3131'
                                                />
                                                <path
                                                    d='M20.0753 9.6661L20.0657 9.65956L15.2382 6.86097L9.79932 11.7007L15.2571 17.1577L20.0592 14.3869C20.9011 13.9324 21.4726 13.0449 21.4726 12.0214C21.4726 11.0053 20.9088 10.1221 20.0753 9.6661Z'
                                                    fill='#F6B60B'
                                                />
                                                <path
                                                    d='M0.090618 1.99389C0.0309008 2.2141 -0.000488281 2.44476 -0.000488281 2.68428V21.3157C-0.000488281 21.5547 0.0305274 21.7862 0.090991 22.0056L10.3669 11.7315L0.090618 1.99389Z'
                                                    fill='#5778C5'
                                                />
                                                <path
                                                    d='M10.098 11.9995L15.2398 6.85916L4.07048 0.38339C3.6645 0.140229 3.19068 -0.000103951 2.68365 -0.000103951C1.44255 -0.000103951 0.39545 0.844427 0.0907051 1.99072L0.090332 1.99361L10.098 11.9995Z'
                                                    fill='#3BAD49'
                                                />
                                            </svg>
                                            <p className='text-xs text-black'>
                                                Скачать <br />
                                                из{' '}
                                                <span className='font-bold'>
                                                    Play Market
                                                </span>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                <div className='flex flex-col border-b border-solid border-[#EEEEEE]'>
                                    <div className='flex gap-3 items-center'>
                                        <span className='flex items-center justify-center bg-black text-white min-w-8 h-8 rounded-full'>
                                            2
                                        </span>
                                        <p className='text-base text-black'>
                                            Скопируйте ссылку на товар, выполнив
                                            эти действия
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-3 justify-center'>
                                        <Image
                                            src='/images/searchPage/example1.png'
                                            alt='store link'
                                            width={128}
                                            height={200}
                                        />

                                        <Image
                                            className='translate-y-4'
                                            src='/images/searchPage/example2.png'
                                            alt='market link'
                                            width={128}
                                            height={200}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-3 items-center'>
                                        <span className='flex items-center justify-center bg-black text-white min-w-8 h-8 rounded-full'>
                                            3
                                        </span>
                                        <p className='text-base text-black'>
                                            Вставьте ссылку в строку поиска выше
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            isStatus === 'error' && (
                                <SpecificBlock
                                    imageUrl={image.src}
                                    text='Скопируйте снова ссылку из Poizon, следуя инструкции и повторите ваш запрос'
                                    title='По вашей ссылке ничего не найдено'
                                    linkText=''
                                    positionImage='bottom'
                                />
                            )
                        )}
                    </div>
                    <div className='w-full px-3 pt-3 bg-white fixed bottom-[73px] left-0 right-0'>
                        <Button
                            onClick={handleClick}
                            className='w-full py-3 bg-black rounded-xl text-white text-base'
                        >
                            Найти товар
                        </Button>
                    </div>
                </div>
            </MainContainer>
        </>
    )
}

export default SearchPage
