/* eslint-disable react/jsx-filename-extension */
import { useEffect } from 'react'

import { useAppDispatch } from '../hooks/redux-hooks/redux-hooks'
import { getCartsThunk } from '../store/slices/getCarts/getCarts/getCarts'
import { getOrdersThunk } from '../store/slices/orders/thunks'

export default function DataProvider({ children }) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getOrdersThunk({}))
        dispatch(getCartsThunk({}))
    }, [dispatch])

    return children
}
