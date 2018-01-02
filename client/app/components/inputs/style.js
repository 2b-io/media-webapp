import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import { fontStyle } from 'styles/global'

export const textInputStyle = prefix({
  ...fontStyle,
  ':focus': {
    outline: 'none',
    border: `1px solid ${COLOR.darkGray}`
  },
  ':hover': {
    outline: 'none',
    border: `1px solid ${COLOR.darkGray}`
  },
  padding: '.75rem',
  border: `1px solid ${COLOR.lightGray}`,
  WebkitAppearance: 'none',
  width: '100%',
  maxWidth: '100%',
  transition: 'border .2s'
})
