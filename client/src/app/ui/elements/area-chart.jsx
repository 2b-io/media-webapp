import dateFormat from 'dateformat'
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
import styled from 'styled-components'

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

const _CustomizedXAxisTick = ({
  className,
  payload,
  period,
  x, y
}) => (
  <g transform={ `translate(${ x },${ y })` } className={ className }>
    <text x={ 0 } y={ 0 } dy={ 16 } textAnchor="middle" fill="currentColor">
      {
        dateFormat(payload.value, 'mmm, dd')
      }
    </text>
    { period === 'hourly' &&
      <text x={ 0 } y={ 0 } dy={ 32 } textAnchor="middle" fill="currentColor">
        {
          dateFormat(payload.value, 'HH:MM')
        }
      </text>
    }
  </g>
)

const CustomizedXAxisTick = styled(_CustomizedXAxisTick)`
  & text {
    color: ${ ({ theme }) => theme.secondary.base };
    line-height: 24px;
    font-size: 12px;
  }
`

const _CustomizedYAxisTick = ({
  dataConvert,
  className,
  payload,
  x, y
}) => (
  <g transform={ `translate(${ x },${ y })` } className={ className }>
    <text
      x={ -16 } y={ 0 } dy={ 8 }
      textAnchor="middle"
      fill="currentColor"
    >
      {
        dataConvert ?
          dataConvert(payload.value) :
          payload.value
      }
    </text>
  </g>
)

const CustomizedYAxisTick = styled(_CustomizedYAxisTick)`
  & text {
    color: ${ ({ theme }) => theme.secondary.base };
    line-height: 24px;
    font-size: 12px;
  }
`

const renderTooltip = (content) => ({ active, label, payload }) => {
  if (!active) {
    return null
  }

  return content({ label, payload })
}

const AreaChartWrapper = ({
  customTooltip,
  data,
  dataConvert,
  name,
  period,
  valueKey, xKey, yKey,
  type
}) => (
  <ResponsiveContainer width="100%" height={ 300 }>
    <AreaChart data={ data }>
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
        tick={ <CustomizedXAxisTick period={ period } /> }
      />
      <YAxis
        stroke={ AREA_CHART_STYLE.color.yAxis }
        dataKey={ yKey }
        tick={ <CustomizedYAxisTick dataConvert={ dataConvert } /> }
      />
      <Tooltip
        content={ renderTooltip(customTooltip) }
      />
    </AreaChart>
  </ResponsiveContainer>
)



export default AreaChartWrapper
