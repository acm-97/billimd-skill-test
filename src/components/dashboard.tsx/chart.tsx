import {useState} from 'react'
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {useSuspenseQuery} from '@tanstack/react-query'
import {cryptoHistoryQuery} from '@/pages/dashboard'

export function CryptoChart({selectedCripto}: {selectedCripto: string}) {
  const {data, error} = useSuspenseQuery(cryptoHistoryQuery(selectedCripto))
  const [, setTimeframe] = useState('7d')

  // Format the data for the chart
  const chartData = data.prices?.map((item: any) => ({
    date: new Date(item[0]).toLocaleDateString(),
    price: item[1],
  }))

  if (error) return

  return (
    <div className="p-4 border-b">
      <Tabs defaultValue="7d" onValueChange={setTimeframe}>
        <TabsList>
          <TabsTrigger value="7d">7d</TabsTrigger>
          <TabsTrigger value="30d">30d</TabsTrigger>
          <TabsTrigger value="90d">90d</TabsTrigger>
        </TabsList>

        <TabsContent value="7d" className="mt-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.slice(-7)} margin={{bottom: 30, right: 30}}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{fontSize: 12}}
                  angle={-45}
                  tickMargin={20}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{fontSize: 12}}
                  tickFormatter={(value: string) => `$${value.toLocaleString()}`}
                  domain={['auto', 'auto']}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  labelFormatter={(label: string) => `Date: ${label}`}
                />
                <Area type="monotone" dataKey="price" fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="30d" className="mt-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.slice(-30)} margin={{bottom: 30, right: 30}}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{fontSize: 12}}
                  angle={-45}
                  tickMargin={20}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{fontSize: 12}}
                  tickFormatter={(value: string) => `$${value.toLocaleString()}`}
                  domain={['auto', 'auto']}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  labelFormatter={(label: string) => `Date: ${label}`}
                />
                <Area type="monotone" dataKey="price" fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="90d" className="mt-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{bottom: 30, right: 30}}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{fontSize: 12}}
                  angle={-45}
                  tickMargin={20}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{fontSize: 12}}
                  tickFormatter={(value: string) => `$${value.toLocaleString()}`}
                  domain={['auto', 'auto']}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  labelFormatter={(label: string) => `Date: ${label}`}
                />
                <Area type="monotone" dataKey="price" fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
