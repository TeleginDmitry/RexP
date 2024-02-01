/* eslint-disable no-restricted-syntax */
import type React from 'react'
import { useEffect, useRef } from 'react'

interface IUseObserver {
    observerParams?: IntersectionObserverInit
    element: React.MutableRefObject<HTMLElement | null>
    callback: (props?: any) => void
    condition?: boolean
    isLoading?: boolean
}

export const useObserver = ({
    observerParams = {},
    condition = true,
    isLoading,
    callback,
    element
}: IUseObserver) => {
    const observer = useRef<IntersectionObserver>()

    useEffect(() => {
        if (isLoading) {
            return
        }
        if (observer.current) {
            observer.current.disconnect()
        }

        const cb: IntersectionObserverCallback = function (entries) {
            if (entries[0].isIntersecting && condition) {
                callback()
            }
        }
        observer.current = new IntersectionObserver(cb, observerParams)
        if (element.current) {
            observer.current.observe(element.current)
        }
    }, [isLoading])
}
