import {CryptoCards} from '@/components/dashboard.tsx/cards'
import {CryptoChart} from '@/components/dashboard.tsx/chart'
import {QueryClient, queryOptions} from '@tanstack/react-query'
import {Crypto} from './types'
import client from '@/lib/api-client'
import {useState} from 'react'

export const cryptoQuery = () =>
  queryOptions({
    queryKey: ['crypto'],
    queryFn: async (): Promise<Crypto[]> => {
      try {
        return await client.get(
          '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false',
        )
      } catch (error: any) {
        // Return empty array on rate limit error or network error
        if (error?.response?.status === 429 || error?.message === 'Network Error') {
          return []
        }
        throw error
      }
    },
    refetchInterval: 1000 * 30,
  })

export const cryptoHistoryQuery = (id: string = 'bitcoin', days = 90) =>
  queryOptions({
    queryKey: ['crypto-history', id],
    queryFn: async () => {
      try {
        return await client.get(`/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
      } catch (error: any) {
        // Return empty data structure on rate limit error or network error
        if (error?.response?.status === 429 || error?.message === 'Network Error') {
          return {
            prices: [],
            market_caps: [],
            total_volumes: [],
          }
        }
        throw error
      }
    },
    refetchInterval: 1000 * 30,
  })

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(cryptoQuery())
  await queryClient.ensureQueryData(cryptoHistoryQuery())
  return {}
}

export default function Dashboard() {
  const [selectedCripto, setSelectedCrypto] = useState<string>('bitcoin')
  return (
    <div className="p-6">
      <CryptoCards setSelectedCrypto={setSelectedCrypto} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          <span className="capitalize">{selectedCripto}</span> Price History
        </h2>
        <div className="rounded-lg border bg-card p-4">
          <CryptoChart selectedCripto={selectedCripto} />
        </div>
      </div>
    </div>
  )
}
