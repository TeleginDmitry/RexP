import type { AxiosResponse } from 'axios'

import $api from '@/src/api/api'

interface Token {
    token: string
}

interface Props {
    initData: string
}

export const getToken = async (data: Props): Promise<AxiosResponse<Token>> =>
    $api.post('/user/login', data)
