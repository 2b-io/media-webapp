import dateFormat from 'dateformat'
import humanFormat from 'human-format'
import humanSize from 'human-size'

const formatDate = (time, format) => dateFormat(time, format)

const formatNumber = (value) => humanFormat(value)

const formatSize = (value) => humanSize(value)

export default {
  formatDate,
  formatNumber,
  formatSize
}
