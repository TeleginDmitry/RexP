import Link from 'next/link'

import type { DefaultLinkProps } from './types'

const DefaultLink: React.FC<DefaultLinkProps> = ({ children, ...props }) => (
    <Link {...props}>{children}</Link>
)

export default DefaultLink
