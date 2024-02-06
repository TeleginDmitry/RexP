import clsx from 'clsx'

import type { RootTextProps } from './types'

import s from './RootText.module.scss'

const RootText: React.FC<RootTextProps> = ({
    maxWidth = 1920,
    as = 'div',
    children,
    className,
    variant = '11px',
    color = 'black',
    style,
    ...props
}) => {
    const Wrapper = as

    return (
        <Wrapper
            className={clsx(
                s.text,
                s[color],
                s[as],
                s[`fs-${variant}`],
                className
            )}
            style={{ maxWidth: `${maxWidth}px`, ...style }}
            {...props}
        >
            {children}
        </Wrapper>
    )
}

export default RootText
