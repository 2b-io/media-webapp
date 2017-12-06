import color from 'color'
import { fontStyle } from 'styles/global'

export default {
  wrapper: {
    ...fontStyle,
    padding: '.5rem 1.5rem 1rem'
  },
  administrationHeading: {
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    color: color('#717274'),
    letterSpacing: '.5px',
    marginBottom: 0,
    fontWeight: 400
  },
  personalMenu: {
    marginBottom: '1.5rem'
  },
  administratorMenu: {

  },
  menuItem: {
    lineHeight: '1.8rem'
  }
}
