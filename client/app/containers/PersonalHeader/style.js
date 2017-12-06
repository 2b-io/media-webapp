import color from 'color'

// internal
import { fontStyle } from 'styles/global'

export default {
  wrapper: {
    ...fontStyle,
    height: '70px',
    background: color('#ffffff'),
    borderBottom: `1px solid ${color('#ebebeb')}`
  },
  container: {
    padding: '0 4vw',
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  menuIcon: {
    marginRight: 'auto',
    cursor: 'pointer'
  },
  addProjectIcon: {
    marginLeft: 'auto',
    cursor: 'pointer'
  }
}
