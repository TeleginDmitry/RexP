/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'

import { Button, Modal } from '@nextui-org/react'

import Check from 'public/images/icons/check.svg'
import Close from 'public/images/icons/close.svg'
import Share from 'public/images/icons/share.svg'
import Telegram from 'public/images/icons/Telegram.svg'
import Viber from 'public/images/icons/Viber.svg'
import Vkontakte from 'public/images/icons/Vkontakte.svg'
import Whatsapp from 'public/images/icons/Whatsapp.svg'

interface Props {
    isOpen: boolean
    onClose: () => void
    productId: number | string
}
export const ProductModal = ({ isOpen, onClose, productId }: Props) => {
    const [isCopied, setCopied] = useState(false)

    function changeIsCopied() {
        setCopied(true)
    }

    function copyUrl() {
        navigator.clipboard.writeText(
            `https://poizonrex.ru/catalog/${productId}`
        )
        changeIsCopied()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='fixed top-0 left-0 z-[1000000] p-4 flex justify-center items-center flex-col gap-3 w-full h-full bg-black bg-opacity-40'>
                <div className='p-5 rounded-[20px] max-w-80 bg-white flex flex-col gap-4 w-full'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-base font-semibold'>Поделиться</h1>
                        <button onClick={onClose}>
                            <Close />
                        </button>
                    </div>
                    <ul className='flex gap-2 items-center justify-between'>
                        <a
                            target='_blank'
                            href={`https://t.me/share/url?url=https://t.me/poizonrex_bot?start=product${productId}`}
                        >
                            <Telegram />
                        </a>
                        <a
                            target='_blank'
                            href={`https://wa.me/?text=https://t.me/poizonrex_bot?start=product${productId}`}
                        >
                            <Whatsapp />
                        </a>
                        <a
                            target='_blank'
                            href={`https://vk.com/share.php?title=https://t.me/poizonrex_bot?start=product${productId}`}
                        >
                            <Vkontakte />
                        </a>
                        <a
                            target='_blank'
                            href={`viber://forward?text=https://t.me/poizonrex_bot?start=product${productId}`}
                        >
                            <Viber />
                        </a>
                    </ul>

                    <Button
                        onClick={copyUrl}
                        className='w-full text-white font-bold bg-black !py-4 rounded-lg'
                    >
                        <Share /> Скопировать ссылку
                    </Button>
                </div>
                {isCopied && (
                    <div className='p-3 rounded-[12px] max-w-80 bg-white flex justify-between items-center w-full'>
                        <p className='text-[rgba(3,164,0,1)] text-sm'>
                            Ссылка скопирована
                        </p>
                        <Check />
                    </div>
                )}
            </div>
        </Modal>
    )
}
