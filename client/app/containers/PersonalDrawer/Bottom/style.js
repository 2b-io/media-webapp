import color from 'color'
import prefix from 'helpers/prefix'
import { fontStyle } from 'styles/global'

export default prefix({
  wrapper: {
    ...fontStyle,
    padding: '.5rem 1.5rem 1rem',
    minHeight: 'fit-content'
  },
  linkMenu: {
    marginBottom: '1.5rem'
  },
  linkItem: {
  },
  linkIcon: {
    marginLeft: '.75rem'
  },
  linkText: {
    ':hover': {
      textDecoration: 'underline'
    },
    color: color('#717274'),
    fontSize: '.9rem',
    fontWeight: 700,
    cursor: 'pointer'
  },
  signature: {
    color: '#d72b3f',
    fontSize: '.7rem'
  }
})
