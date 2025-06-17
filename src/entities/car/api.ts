import { AxiosRequestConfig } from 'axios'

import Request from '@/api/axios'
import { TCarData } from './types'

export const CAR_LIST_URL = '/api/cars'
export const getCarList = (
  params = {},
  config?: AxiosRequestConfig,
) => Request.get<TCarData>(CAR_LIST_URL, { params, ...config })
