import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'

export default prefix({
  ':focus': {
    outline: 'none'
  },
  ':active': {
    outline: 'none'
  },
  ':hover': {
    color: COLOR.dark,
  },
  color: COLOR.darkGray,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color .2s'
})
