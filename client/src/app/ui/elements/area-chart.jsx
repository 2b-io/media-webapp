import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const AREA_CHART_STYLE = {
  color: {
    cartesianGrid: '#e6e6e6',
    lines: [
      '#ed8b45',
      '#25ba90',
      '#e8af87',
      '#a05de8',
      '#b4a3c7'
    ],
    xAxis: '#111111',
    yAxis: '#111111'
  }
}

const renderXAxisTick = (content) => ({
  className,
  payload,
  period,
  x, y
}) => {
  if (!payload) {
    return null
  }

  return content({ className, payload, period, x, y })
}

const renderYAxisTick = (content) => ({
  className,
  payload,
  convertData,
  x, y
}) => {
  if (!payload) {
    return null
  }

  return content({ className, payload, convertData, x, y })
}

const renderTooltip = (content) => ({ active, label, payload }) => {
  if (active && payload && label ) {
    return content({ label, payload })
  }

  return null
}

const AreaChartWrapper = ({
  customTooltip,
  customXAxisTick,
  customYAxisTick,
  data,
  name,
  valueKey, xKey, yKey,
  type,
  ...props
}) => (
  <ResponsiveContainer width="100%" height={ 300 }>
    <AreaChart data={ data } { ...props }>
      <Area
        activeDot={ { r: 8 } }
        dataKey={ valueKey }
        name={ name }
        stroke={ AREA_CHART_STYLE.color.lines[0] }
        type={ type }
      />
      <Legend
        iconSize={ 16 }
        verticalAlign="top"
        height={ 40 }
      />
      <CartesianGrid
        stroke={ AREA_CHART_STYLE.color.cartesianGrid }
        vertical={ false }
      />
      <XAxis
        stroke={ AREA_CHART_STYLE.color.xAxis }
        dataKey={ xKey }
        height={ 40 }
        tick={ customXAxisTick && renderXAxisTick(customXAxisTick) }
      />
      <YAxis
        stroke={ AREA_CHART_STYLE.color.yAxis }
        dataKey={ yKey }
        tick={ customYAxisTick && renderYAxisTick(customYAxisTick) }
      />
      <Tooltip
        content={ customTooltip && renderTooltip(customTooltip) }
      />
    </AreaChart>
  </ResponsiveContainer>
)

export default AreaChartWrapper
