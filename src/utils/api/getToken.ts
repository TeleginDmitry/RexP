import type { AxiosError, AxiosResponse } from 'axios'

import $api from '@/src/api/api'

interface Token {
    token: string
}

interface Props {
    initData: string
}

export const login = async (
    valuesData: Props
): Promise<AxiosError<{ message: unknown }> | AxiosResponse<Token>> =>
    $api.post('/user/login', valuesData)

export const register = async (
    valuesData: Props
): Promise<AxiosResponse<Token> | AxiosResponse<Token>> =>
    $api.post('/user/registration', valuesData)
