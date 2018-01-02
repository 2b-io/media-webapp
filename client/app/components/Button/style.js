import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import { fontStyle } from 'styles/global'

export default prefix({
  ...fontStyle,
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
  fontSize: '18px',
  display: 'inline-block',
  height: '40px',
  lineHeight: '34px',
  transition: 'color .2s, background .2s',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
})
