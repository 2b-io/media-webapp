import prefix from 'helpers/vendor-prefix'
import { COLOR, FONT_SIZE } from 'styles/constants'

export const fontStyle = prefix({
  fontFamily: 'Space Mono, Consolas, monaco, monospace',
  color: COLOR.dark,
  fontSize: FONT_SIZE.normal,
  lineHeight: '25px',
  wordBreak: 'break-word'
})
