import { useLayoutEffect, useState } from 'react'

const useClientSide = () => {
    const [isClientSide, setIsClientSide] = useState(false)

    useLayoutEffect(() => {
        setIsClientSide(true)
    }, [])

    return isClientSide
}

export default useClientSide
