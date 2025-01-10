import { useMemo } from 'react'
import { EngagementData } from '@/services/analytics'
import { AreaChart } from '@/components/ui/area-chart'

interface EngagementChartProps {
  data: EngagementData[]
}

export function EngagementChart({ data }: EngagementChartProps) {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: new Date(item.date).toLocaleDateString(),
      Likes: item.likes,
      Shares: item.shares,
      Comments: item.comments,
    }))
  }, [data])

  return (
    <AreaChart
      data={chartData}
      index="date"
      categories={['Likes', 'Shares', 'Comments']}
      colors={['blue', 'green', 'purple']}
      valueFormatter={(value: number) => `${value.toLocaleString()}`}
      yAxisWidth={40}
    />
  )
}

