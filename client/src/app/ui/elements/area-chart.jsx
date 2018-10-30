import dateFormat from 'dateformat'
import humanSize from 'human-size'
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

import { DescriptionTextLine } from 'ui/typo'

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

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
`

const Content = styled.div`
  position: relative;
  box-shadow: 4px 4px ${ ({ theme }) => theme.black.opaque.base };
  background: ${
    ({ theme }) => theme.white.base
  };
`

const AreaChartContent = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
  background: transparent;
  color: ${ ({ theme }) => theme.black.base };
`

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
  className,
  payload,
  x, y
}) => (
  <g transform={ `translate(${ x },${ y })` } className={ className }>
    <text
      x={ -16 } y={ 0 } dy={ 8 }
      textAnchor="middle"
      fill="currentColor"
    >{ humanSize(payload.value) }</text>
  </g>
)

const CustomizedYAxisTick = styled(_CustomizedYAxisTick)`
  & text {
    color: ${ ({ theme }) => theme.secondary.base };
    line-height: 24px;
    font-size: 12px;
  }
`

const CustomTooltip = ({
  active,
  payload,
  label
}) => active ? (
  <Content>
    <Border />
    <AreaChartContent>
      <DescriptionTextLine mostLeft mostRight>
        {
          `Date: ${ label }`
        }
      </DescriptionTextLine>
      <DescriptionTextLine mostLeft mostRight>
        {
          `Total Bytes: ${ humanSize(payload[0].value) }`
        }
      </DescriptionTextLine>
      <DescriptionTextLine mostLeft mostRight>
        {
          `Total Bytes from Misses: ${ humanSize(payload[0].value) }`
        }
      </DescriptionTextLine>
    </AreaChartContent>
  </Content>
) : null

const AreaChartWrapper = ({
  data,
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
        tick={ <CustomizedYAxisTick /> }
      />
      <Tooltip
        content={ <CustomTooltip /> }
      />
    </AreaChart>
  </ResponsiveContainer>
)

export default AreaChartWrapper
