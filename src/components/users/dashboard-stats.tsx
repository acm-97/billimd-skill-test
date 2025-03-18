import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Users, UserCheck, ClockIcon as UserClock, AlertCircle} from 'lucide-react'

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,853</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
          <div className="mt-4 h-1 w-full bg-primary/10 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[75%]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,926</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
          <div className="mt-4 h-1 w-full bg-green-500/10 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full w-[67%]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
          <UserClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">342</div>
          <p className="text-xs text-muted-foreground">-2% from last month</p>
          <div className="mt-4 h-1 w-full bg-yellow-500/10 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full w-[12%]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Failed Tests</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89</div>
          <p className="text-xs text-muted-foreground">+3% from last month</p>
          <div className="mt-4 h-1 w-full bg-red-500/10 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-[3%]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
