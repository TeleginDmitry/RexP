import clsx from 'clsx'

import type { RootIconProps } from './types'

import s from './RootIcon.module.scss'

const RootIcon: React.FC<RootIconProps> = ({
    name,
    className,
    disableHover,
    rounded,
    onClick = () => {}
}) => (
    <div
        role='presentation'
        onClick={onClick}
        className={clsx(
            s.icon,
            s[name],
            !disableHover && s.allowHover,
            rounded && s.rounded,
            className
        )}
    />
)

export default RootIcon
