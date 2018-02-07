import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import { fontStyle } from 'styles/global'

export const text = prefix({
  ...fontStyle,
  ':focus': {
    outline: 'none',
    borderBottom: `2px solid ${COLOR.dark}`
  },
  ':hover': {
    outline: 'none',
    borderBottom: `2px solid ${COLOR.darkGray}`
  },
  padding: '15px',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: `2px solid ${COLOR.lightGray}`,
  borderRadius: '0px',
  WebkitAppearance: 'none',
  width: '100%',
  maxWidth: '100%',
  transition: 'border .2s',
  color: COLOR.darkGray,
  resize: 'none'
})
