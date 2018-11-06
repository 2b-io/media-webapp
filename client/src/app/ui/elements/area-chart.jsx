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
  x, y
}) => {
  if (!payload) {
    return null
  }

  return content({ className, payload, x, y })
}

const renderYAxisTick = (content) => ({
  className,
  payload,
  x, y
}) => {
  if (!payload) {
    return null
  }

  return content({ className, payload, x, y })
}

const renderTooltip = (content) => ({
  active,
  label,
  payload
}) => {
  if (!active || !payload || !label) {
    return null
  }

  return content({ label, payload })
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
        isAnimationActive={ false }
        name={ name }
        stroke="none"
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
        width={ 80 }
        tick={ customYAxisTick && renderYAxisTick(customYAxisTick) }
      />
      <Tooltip
        content={ customTooltip && renderTooltip(customTooltip) }
      />
    </AreaChart>
  </ResponsiveContainer>
)

export default AreaChartWrapper
