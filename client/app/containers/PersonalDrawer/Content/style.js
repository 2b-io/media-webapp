import color from 'color'
import prefix from 'helpers/vendor-prefix'
import { fontStyle } from 'styles/global'

export default prefix({
  wrapper: {
    ...fontStyle,
    padding: '.5rem 1.5rem 1rem',
    flexGrow: 1,
    minHeight: 'fit-content'
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
    marginBottom: '1.5rem'
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuIcon: {
    marginRight: '.75rem'
  },
  menuText: {
    ':hover': {
      textDecoration: 'underline'
    },
    fontWeight: 700,
    color: color('#2c2d30'),
    flexGrow: 1,
    whiteSpace: 'nowrap'
  }
})
