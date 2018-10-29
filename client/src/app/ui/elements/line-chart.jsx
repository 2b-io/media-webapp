import React from 'react'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const LineChartWrapper = ({
  data
}) => (
  <ResponsiveContainer width="100%" height={ 300 }>
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
      <YAxis dataKey="bandwidth" />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
)

export default LineChartWrapper
