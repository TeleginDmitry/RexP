/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react'

import { LIMIT, PAGE } from '../constants'
import type { ResponsePaginatedData } from '../types/pagination.types'

type UsePaginationProps = {
    callback: ({
        nextPage
    }: {
        nextPage: number | null
    }) => Promise<ResponsePaginatedData>
    limit?: number
    page?: number
    isDisabled?: boolean
}

export const usePagination = ({
    callback,
    limit: currentLimit = LIMIT,
    page: currentPage = PAGE,
    isDisabled
}: UsePaginationProps) => {
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [nextPage, setNextPage] = useState<number | null>(currentPage + 1)
    const [totalPages, setTotalPages] = useState<number | null>(null)
    const [totalItems, setTotalItems] = useState<number | null>(null)
    const [page, setPage] = useState<number>(currentPage)
    const [limit] = useState<number>(currentLimit)

    async function fetchQuery() {
        if (isDisabled && nextPage === null) {
            return
        }

        try {
            setIsLoading(true)
            const {
                nextPage: responseNextPage,
                totalItems,
                totalPages
            } = await callback({
                nextPage
            })
            setNextPage(responseNextPage)
            setTotalPages(totalPages)
            setTotalItems(totalItems)
            setPage((state) => state + 1)
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isError,
        isLoading,
        limit,
        page,
        nextPage,
        totalItems,
        totalPages,
        fetchQuery
    }
}
