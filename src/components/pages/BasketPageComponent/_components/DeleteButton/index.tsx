import type { Dispatch, SetStateAction } from 'react'

import RootIcon from '@/src/components/ui/icons/RootIcon'
import RootButton from '@/src/components/ui/RootButton'
import { useAppDispatch } from '@/src/hooks/redux-hooks/redux-hooks'
import { deleteCartFromStore } from '@/src/store/slices/getCarts'
import { deleteCart } from '@/src/utils/api/deleteCart'

import s from './DeleteButton.module.scss'

interface DeleteButtonProps {
    setSelected: Dispatch<SetStateAction<string[]>>
    selected: string[]
    id: number
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    id,
    setSelected,
    selected
}) => {
    const dispatch = useAppDispatch()

    const onHandleClick = () => {
        deleteCart(id.toString()).then(() => {
            setSelected(selected.filter((item) => item !== `${id}`))
            dispatch(deleteCartFromStore({ id }))
        })
    }

    return (
        <RootButton onClick={onHandleClick} className={s.button}>
            <RootIcon name='delete' />
        </RootButton>
    )
}

export default DeleteButton
