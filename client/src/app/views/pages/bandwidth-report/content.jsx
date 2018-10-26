import React from 'react'
import { connect } from 'react-redux'

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

const getDataArray = (startDate, endDate) => {
  const datas = new Array()
  const date = new Date(startDate)
  while (date <= endDate) {
    datas.push({
      'date': new Date(date).toLocaleDateString('en-US', options),
      'bandwidth': Math.floor(Math.random() * 4e5)
    })
    date.setDate(date.getDate() + 1)
  }

  return datas
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
      <YAxis />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
)

const BandwidthReport = ({
  data
}) => (
  <Container>
    <LineChartWrapper data={ data } />
  </Container>
)

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)
    const data = getDataArray(startDate, endDate)

    return {
      data,
      identifier
    }
  },
  null
)(BandwidthReport)
