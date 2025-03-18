import {CryptoCards} from '@/components/dashboard.tsx/cards'
import {CryptoChart} from '@/components/dashboard.tsx/chart'
import {QueryClient, queryOptions} from '@tanstack/react-query'
import {Crypto} from './types'
import client from '@/lib/api-client'

export const cryptoQuery = () =>
  queryOptions({
    queryKey: ['crypto'],
    queryFn: async (): Promise<Crypto[]> =>
      await client.get(
        '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false',
      ),

    refetchInterval: 1000 * 30,
  })

export const cryptoHistoryQuery = (id: string = 'bitcoin', days = 90) =>
  queryOptions({
    queryKey: ['crypto-history'],
    queryFn: async () => await client.get(`/coins/${id}/market_chart?vs_currency=usd&days=${days}`),
    refetchInterval: 1000 * 30,
  })

export const loader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(cryptoQuery())
  await queryClient.ensureQueryData(cryptoHistoryQuery())
  return {}
}

export default function Dashboard() {
  return (
    <div className="p-6">
      <CryptoCards />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Bitcoin Price History</h2>
        <div className="rounded-lg border bg-card p-4">
          <CryptoChart />
        </div>
      </div>
    </div>
  )
}
