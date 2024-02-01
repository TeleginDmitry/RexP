import type { CheckboxProps } from '@nextui-org/react'
import { Checkbox, cn } from '@nextui-org/react'
import clsx from 'clsx'

import s from './RootCheckbox.module.scss'

interface RootCheckboxProps extends CheckboxProps {}

const RootCheckbox: React.FC<RootCheckboxProps> = ({ ...props }) => (
    <Checkbox
        radius='full'
        size='lg'
        classNames={{
            base: clsx(
                cn(
                    'inline-flex max-w-md w-full m-0',
                    'hover:bg-content2 items-center justify-start',
                    'cursor-pointer rounded-[0px] gap-2 p-[0px] border-transparent',
                    'data-[selected=true]:border-primary'
                ),
                s.checkbox
            ),
            label: 'w-full'
        }}
        {...props}
    />
)

export default RootCheckbox
