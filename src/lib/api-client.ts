import type {AxiosResponse} from 'axios'
import axios from 'axios'
import {toast} from 'sonner'

const _api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  },
})

export const api = _api

_api.interceptors.response.use(
  (config: any) => {
    return config
  },
  (e: any) => {
    if (e.response?.status === 429) {
      toast.error('Seam you have made too many requests. Please try again in a few minutes')
      return
    }

    toast.error(e.message || 'Something went went wrong')

    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(e)
  },
)

class Client {
  async get(url: string, config?: any) {
    return await _api.get(url, config).then((res: AxiosResponse) => res.data)
  }

  async getOne(url: string) {
    return await _api.get(url).then((res: AxiosResponse) => res.data)
  }

  async post(url: string, {data, config}: {data: any; config?: any}) {
    return await _api.post(url, data, config).then((res: AxiosResponse) => res.data)
  }

  async patch(url: string, {data, config}: {data: any; config?: any}) {
    return await _api.patch(url, data, config).then((res: AxiosResponse) => res.data)
  }

  async delete(url: string, config?: any) {
    return await _api.delete(url, config).then((res: AxiosResponse) => res.data)
  }
}

const client = new Client()

export default client
