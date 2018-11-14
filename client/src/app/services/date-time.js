const getStartOfUTCDay = (date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)

const getEndOfUTCDay = (date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59)

const getToDayOfUTCDay = () => {
  const now = new Date()

  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)
}

const getNowOfUTCDay = () => {
  const now = new Date()

  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds())
}

export default {
  getStartOfUTCDay,
  getEndOfUTCDay,
  getNowOfUTCDay,
  getToDayOfUTCDay
}
