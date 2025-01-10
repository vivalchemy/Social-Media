import * as React from "react"
import { AreaChart as TremorAreaChart } from "@tremor/react"

interface AreaChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  yAxisWidth = 40,
}) => {
  return (
    <TremorAreaChart
      className="h-72"
      data={data}
      index={index}
      categories={categories}
      colors={colors}
      valueFormatter={valueFormatter}
      yAxisWidth={yAxisWidth}
    />
  )
}

