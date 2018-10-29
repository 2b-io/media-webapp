import humanSize from 'human-size'
import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import styled from 'styled-components'

import { DescriptionTextLine } from 'ui/typo'

const LINE_CHART_STYLE = {
  color: {
    cartesianGrid: '#e6e6e6',
    line: [
      'cyan',
      '#FFE69A',
      '#BAA6CA',
      '#788195'
    ],
    xAxis: '#111111',
    yAxis: '#111111',
    xAxisTick: '#111111',
    yAxisTick: '#111111'
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

const LineChartContent = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
  background: transparent;
  color: ${ ({ theme }) => theme.black.base };
`

const CustomizedXAxisTick = ({
  x, y,
  payload
}) => (
  <g transform={ `translate(${ x },${ y })` }>
    <text
      x={ 0 } y={ 0 } dy={ 25 }
      textAnchor="end"
      fill={ LINE_CHART_STYLE.color.xAxisTick }
      transform="rotate(-45)"
    >{ payload.value }</text>
  </g>
)

const CustomizedYAxisTick = ({
  x, y,
  payload
}) => (
  <g transform={ `translate(${ x },${ y })` }>
    <text
      x={ -20 } y={ 0 } dy={ 5 }
      textAnchor="middle"
      fill={ LINE_CHART_STYLE.color.yAxisTick }
    >{ humanSize(payload.value) }</text>
  </g>
)

const CustomTooltip = ({
  active,
  payload,
  label
}) => {
  return active ? (
    <Content>
      <Border />
      <LineChartContent>
        <DescriptionTextLine mostLeft mostRight>{ `Date: ${ label }` }</DescriptionTextLine>
        <DescriptionTextLine mostLeft mostRight>{ `Total Bytes: ${ humanSize(payload[0].value) }` }</DescriptionTextLine>
        <DescriptionTextLine mostLeft mostRight>{ `Total Bytes from Misses: ${ humanSize(payload[0].value) }` }</DescriptionTextLine>
      </LineChartContent>
    </Content>
  ) : null
}

const LineChartWrapper = ({
  data
}) => (
  <ResponsiveContainer width="100%" height={ 300 }>
    <LineChart data={ data }>
      <Line
        type="linear"
        dataKey="bandwidth"
        stroke={ LINE_CHART_STYLE.color.line[0] }
        activeDot={ { r: 8 } }
      />
      <Legend verticalAlign="top" height={ 36 } />
      <CartesianGrid
        stroke={ LINE_CHART_STYLE.color.cartesianGrid }
        vertical={ false }
      />
      <XAxis
        stroke={ LINE_CHART_STYLE.color.xAxis }
        dataKey="date"
        height={ 140 }
        tick={ <CustomizedXAxisTick /> }
      />
      <YAxis
        stroke={ LINE_CHART_STYLE.color.yAxis }
        dataKey="bandwidth"
        tick={ <CustomizedYAxisTick /> }
      />
      <Tooltip
        content={ <CustomTooltip /> }
      />
    </LineChart>
  </ResponsiveContainer>
)

export default LineChartWrapper
