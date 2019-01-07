const synthesizeBytesDownloadData = (datapoints) => {
  if (!datapoints.length) {
    return { totalBytes: 0 }
  }

  const totalBytes = datapoints.map((item) => item.value).reduce((total, value) => total + value)

  return { totalBytes }
}

const synthesizeRequestData = (datapoints) => {
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
  const total = values.reduce((a, b) => a + b)
  const average = Math.trunc(total / values.length)

  return {
    average,
    total,
    maximum,
    minimum
  }
}

const synthesizeTimeConsumedData = (datapoints) => {
  if (!datapoints.length) {
    return { totalHours: 0 }
  }

  const totalHours = datapoints.map((item) => item.value).reduce((total, value) => total + value)

  return { totalHours }
}

export default {
  synthesizeBytesDownloadData,
  synthesizeRequestData,
  synthesizeTimeConsumedData
}
