import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import {
    Button,
    Checkbox,
    Popover,
    PopoverContent,
    PopoverTrigger,
    cn,
    Modal
} from '@nextui-org/react'
import clsx from 'clsx'

import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { deleteCartFromStore } from '@/src/store/slices/getCarts'
import { deleteCart } from '@/src/utils/api/deleteCart'

import s from './HeaderBlock.module.scss'

interface HeaderBlockProps {
    setSelected: Dispatch<SetStateAction<string[]>>
    selected: string[]
    isDelete: boolean
    setIsDelete: Dispatch<SetStateAction<boolean>>
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
    selected,
    setSelected,
    isDelete,
    setIsDelete
}) => {
    const [isSelected, setIsSelected] = useState(false)
    const carts = useAppSelector((state) => state.carts.data)
    const dispatch = useAppDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const onHandleClick = () => {
        selected.forEach((id) => {
            deleteCart(id).then(() => {
                dispatch(deleteCartFromStore({ id: +id }))
            })
        })
        setSelected([])
    }

    useEffect(() => {
        if (carts.length === 0) {
            setIsSelected(false)
            return
        }
        setIsSelected(carts.length === selected.length)
    }, [carts.length, selected.length])

    useEffect(() => {
        if (selected.length === 1 && isDelete) {
            setModalOpen(true)
        }
    }, [selected, isDelete])

    const onHandleAllClick = async () => {
        setIsSelected(!isSelected)
        setSelected(isSelected ? [] : carts.map(({ id }) => `${id}`))
    }

    return (
        <div className={s.wrapper}>
            <Checkbox
                aria-label='Выбрать все'
                radius='full'
                size='lg'
                classNames={{
                    base: clsx(
                        cn(
                            'inline-flex max-w-md w-full m-0',
                            'hover:bg-content2 items-center justify-start',
                            'cursor-pointer rounded-[0px] gap-2 p-[0px]  border-transparent',
                            'data-[selected=true]:border-primary'
                        ),
                        s.checkbox
                    ),
                    label: 'w-[calc(100%_-_74px)]'
                }}
                value='Выбрать все'
                isSelected={isSelected}
                onValueChange={onHandleAllClick}
            >
                <div className={s.header}>Выбрать&nbsp;все</div>
            </Checkbox>
            {!!selected.length && (
                <Button
                    onClick={() => setModalOpen(true)}
                    className={s.button}
                    disabled={selected.length === 0}
                >
                    Удалить выбранные
                </Button>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                }}
            >
                <div className='fixed top-0 left-0 z-[1000000] p-4 flex justify-center items-center w-full h-full bg-black bg-opacity-40'>
                    <div className='p-5 rounded-[20px] max-w-80 bg-white flex flex-col gap-2'>
                        <div className='flex flex-col gap-1 items-center'>
                            <h2 className='text-base font-semibold'>
                                Вы уверенны, что хотите удалить{' '}
                                {selected.length > 1
                                    ? 'выбранные товары'
                                    : 'выбранный товар'}
                                ?
                            </h2>
                            <p className='text-sm'>
                                {selected.length > 1
                                    ? 'Эти товары будут удалены'
                                    : 'Этот товар будет удален'}{' '}
                                из корзины безвозвратно
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    onHandleClick()
                                    setModalOpen(false)
                                    setIsDelete(false)
                                }}
                                style={{ borderRadius: 10 }}
                                className='w-full text-base font-semibold py-2 px-1 text-white text-center bg-black'
                            >
                                Да, удалить{' '}
                                {selected.length > 1 ? 'товары' : 'товар'}
                            </button>
                            <button
                                onClick={() => {
                                    setModalOpen(false)
                                    setIsDelete(false)
                                }}
                                className='w-full text-base font-semibold text-black py-2 px-1 text-center'
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* {!!selected.length && (
                <Popover
                    isOpen={isOpen}
                    onOpenChange={(open) =>
                        selected.length !== 0 && setIsOpen(open)
                    }
                >
                    <PopoverTrigger>
                      <Button
                        className={s.button}
                        disabled={selected.length === 0}
                      >
                        Удалить выбранные
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className={s.popover}>
                        <div className={clsx('px-1 py-2', s.content)}>
                            <div className='text-small font-bold'>
                                Вы точно хотите удалить <br /> выбранные товары?
                            </div>
                            <div className={s.buttons}>
                                <Button
                                    className={clsx(
                                        'text-small font-bold',
                                        s.button
                                    )}
                                    onClick={() => {
                                        onHandleClick()
                                        setIsOpen(false)
                                    }}
                                >
                                    Да
                                </Button>
                                <Button
                                    className={clsx(
                                        'text-small font-bold',
                                        s.button
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Нет
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            )} */}
        </div>
    )
}

export default HeaderBlock
