const getStartOfUTCDay = (date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)

const getEndOfUTCDay = (date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59)

export default {
  getStartOfUTCDay,
  getEndOfUTCDay
}
