import color from 'color'

const MENU_HEIGHT = 70

// internal
import { fontStyle } from 'styles/global'

export default {
  wrapper: {
    ...fontStyle,
    height: `${MENU_HEIGHT}px`,
    minHeight: `${MENU_HEIGHT}px`,
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
    marginLeft: 'auto'
  }
}
