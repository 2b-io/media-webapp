import React from 'react'
import { connect } from 'react-redux'

import ms from 'ms'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { selectors } from 'state/interface'
import { Container } from 'ui/elements'

//{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
const options = { month: 'short', day: 'numeric' }
const startDate = new Date('2017-10-01')
const endDate = new Date('2017-10-07')

const getBandwidthByDate = (startDate, endDate) => {
  const data = []
  const reportDate =  new Date(startDate)

  while (reportDate <= endDate) {
    data.push({
      date: reportDate.toLocaleDateString('en-US', options),
      bandwidth: Math.floor(Math.random() * 1e4),
      maxBandwidth: 10000
    })

    reportDate.setTime(reportDate.getTime()+ ms('1d'))
  }

  return data
}

const LineChartWrapper = ({
  data
}) => (
  <ResponsiveContainer width="100%" height={ 400 }>
    <LineChart data={ data }>
      <Line
        type="monotone"
        dataKey="bandwidth"
        stroke={ 'cyan' }
        activeDot={ { r: 8 } }
      />
      <CartesianGrid
        stroke={ '#ccc' }
        vertical={ false }
      />
      <XAxis dataKey="date" />
      <YAxis dataKey="maxBandwidth"/>
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
)

const UsageReport = ({
  data
}) => (
  <Container>
    <LineChartWrapper data={ data } />
  </Container>
)

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)
    const data = getBandwidthByDate(startDate, endDate)

    return {
      data,
      identifier
    }
  },
  null
)(UsageReport)
