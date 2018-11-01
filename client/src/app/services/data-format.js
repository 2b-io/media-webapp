import dateFormat from 'dateformat'
import humanFormat from 'human-format'
import humanSize from 'human-size'

const dateFomart = (time, format) => dateFormat(time, format)

const numberFormat = (value) => humanFormat(value)

const dataSize = (value) => humanSize(value)

export default {
  dateFormat,
  dataSize,
  numberFormat
}
