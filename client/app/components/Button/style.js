import prefix from 'helpers/vendor-prefix'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { fontStyle } from 'styles/global'

export default prefix({
  ...fontStyle,
  ':focus': {
    outline: 'none'
  },
  ':active': {
    outline: 'none'
  },
  ':hover': {
    color: COLOR.light,
    background: COLOR.dark
  },
  color: COLOR.dark,
  background: COLOR.light,
  paddingLeft: '30px',
  paddingRight: '30px',
  border: `2px solid ${COLOR.dark}`,
  borderRadius: '20px',
  fontSize: FONT_SIZE.normal,
  display: 'inline-block',
  height: '40px',
  lineHeight: '35px',
  transition: 'color .2s, background .2s',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
})
