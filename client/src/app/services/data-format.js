import dateFormat from 'dateformat'
import humanFormat from 'human-format'
import ms from 'ms'
import prettyBytes from 'pretty-bytes'

const formatTime = (time, format) => dateFormat(time, format)

const formatNumber = (value) => humanFormat(value)

const formatSize = (value) => prettyBytes(value)

const formatMilisecondToString = (time, format) => {
  if (format) {
    const hour = Math.floor(time / ms('1h'))
    const min = Math.floor((time % ms('1h')) / ms('1m'))
    const sec = Math.floor((time % ms('1m')) / ms('1s'))

    return `${ hour > 9 ? hour : '0'+hour }h:
      ${ min > 9 ? min : '0'+min }m:
      ${ sec > 9 ? sec : '0'+sec }s
    `
  }

  return `${ Math.floor(time / ms('1000')) }s`
}

export default {
  formatNumber,
  formatTime,
  formatSize,
  formatMilisecondToString
}
