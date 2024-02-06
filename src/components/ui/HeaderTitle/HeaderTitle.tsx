import clsx from 'clsx'
import { useRouter } from 'next/router'

import RootIcon from '../icons/RootIcon'

/* eslint-disable react/no-unused-prop-types */
interface Props {
    title: string
    children?: React.ReactNode
}

export const HeaderTitle = ({ title, children }: Props) => {
    const router = useRouter()

    function onClickLink() {
        router.back()
    }

    return (
        <div className='fixed top-0 left-0 w-full bg-white px-4 pt-2 pb-2 z-20 flex items-center justify-center'>
            <button
                className='absolute top-1/2 left-4 -translate-y-1/2'
                onClick={onClickLink}
            >
                <RootIcon name='arrowLeft' />
            </button>
            <h1 className='text-lg font-semibold text-center'>{title}</h1>
            {children}
        </div>
    )
}
