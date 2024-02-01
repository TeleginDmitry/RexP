/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'

import type { AxiosResponse } from 'axios'

import { useAppDispatch, useAppSelector } from './redux-hooks/redux-hooks'

import { setPagination } from '../store/slices/pagination'

type UsePaginationProps = {
    callback: ({
        limit,
        page
    }: {
        limit: number
        page: number
    }) => Promise<AxiosResponse>
    limit: number
    page: number
    isDisabled?: boolean
    options?: IntersectionObserverInit
}

export const usePagination = ({ callback, isDisabled }: UsePaginationProps) => {
    const dispatch = useAppDispatch()

    const [error, isError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { limit, page } = useAppSelector((state) => state.pagination)

    async function fetchQuery() {
        if (isDisabled) {
            return
        }

        try {
            setIsLoading(true)
            const { headers } = await callback({ limit, page })
            console.log(headers)
            dispatch(
                setPagination({
                    page: page + 1,
                    totalItems: headers.totalItems,
                    totalPages: headers.totalPages
                })
            )
        } catch (error) {
            setIsLoading(false)
            isError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        error,
        isLoading,
        limit,
        page,
        fetchQuery
    }
}
