import {ArrowDown, ArrowUp, RefreshCw} from 'lucide-react'
import {useState} from 'react'
import {Fade} from 'react-awesome-reveal'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {useSuspenseQuery} from '@tanstack/react-query'
import {cryptoQuery} from '@/pages/dashboard'

export function CryptoCards() {
  const {data, refetch, isLoading, error} = useSuspenseQuery(cryptoQuery())
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const refreshData = async () => {
    await refetch()
    setLastUpdated(new Date())
  }

  if (error) return

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-col sm:flex-row">
        <h2 className="text-2xl font-bold">Top Cryptocurrencies</h2>
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Fade cascade>
          {data.map(crypto => (
            <Card key={crypto.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={crypto.image || '/placeholder.svg'}
                      alt={crypto.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <CardTitle className="text-lg">{crypto.name}</CardTitle>
                  </div>
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md uppercase">
                    {crypto.symbol}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</div>
                <div
                  className={`flex items-center mt-1 ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  {crypto.price_change_percentage_24h >= 0 ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 text-xs text-muted-foreground">
                <div className="grid grid-cols-2 w-full gap-2">
                  <div>
                    <div>Market Cap</div>
                    <div className="font-medium">${crypto.market_cap.toLocaleString()}</div>
                  </div>
                  <div>
                    <div>24h Volume</div>
                    <div className="font-medium">${crypto.total_volume.toLocaleString()}</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </Fade>
      </div>
    </div>
  )
}
