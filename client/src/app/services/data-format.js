import dateFormat from 'dateformat'
import humanFormat from 'human-format'
import prettyBytes from 'pretty-bytes'

const formatTime = (time, format) => dateFormat(time, format)

const formatNumber = (value) => humanFormat(value)

const formatSize = (value) => prettyBytes(value)

export default {
  formatNumber,
  formatTime,
  formatSize
}
