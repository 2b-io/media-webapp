import color from 'color'
import prefix from 'helpers/vendor-prefix'
import { fontStyle } from 'styles/global'

const MENU_HEIGHT = 70

export default prefix({
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
})
