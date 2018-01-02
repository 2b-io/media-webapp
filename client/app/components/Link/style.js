import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'

export const linkStyle = prefix({
  ':focus': {
    outline: 'none'
  },
  ':active': {
    outline: 'none'
  },
  color: COLOR.darkGray,
  textDecoration: 'none',
  cursor: 'pointer'
})
