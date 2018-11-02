import dateFormat from 'dateformat'
import humanFormat from 'human-format'
import humanSize from 'human-size'

const formatTime = (time, format) => dateFormat(time, format)

const formatNumber = (value) => humanFormat(value)

const formatSize = (value) => humanSize(value)

export default {
  formatNumber,
  formatTime,
  formatSize
}
