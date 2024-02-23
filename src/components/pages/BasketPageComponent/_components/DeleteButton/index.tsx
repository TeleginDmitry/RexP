import RootIcon from '@/src/components/ui/icons/RootIcon'
import RootButton from '@/src/components/ui/RootButton'

import s from './DeleteButton.module.scss'

interface Props {
    onClick: () => void
}
const DeleteButton = ({ onClick }: Props) => (
    <RootButton onClick={onClick} className={s.button}>
        <RootIcon name='delete' />
    </RootButton>
)

export default DeleteButton
