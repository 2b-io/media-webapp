import color from 'color'
import { fontStyle } from 'styles/global'

export default {
  wrapper: {
    ...fontStyle,
    padding: '.5rem 1.5rem 1rem'
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
    fontWeight: 700
  }
}
