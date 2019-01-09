const synthesizeData = (datapoints) => {
  if (!datapoints.length) {
    return {
      average: 0,
      total: 0,
      maximum: 0,
      minimum: 0
    }
  }

  const values = datapoints.map((item) => item.value)
  const minimum = Math.min(...values)
  const maximum = Math.max(...values)
  const total = values.reduce((total, value) => total + value)
  const average = Math.trunc(total / values.length)

  return {
    average,
    total,
    maximum,
    minimum
  }
}

export default {
  synthesizeData
}
