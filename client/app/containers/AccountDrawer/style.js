import color from 'color'

const MENU_HEIGHT = 70
const ICON_SIZE = 24

export const sideMenuStyle = {
  bmMenu: {
    background: `url(${require('img/bg_halftone_black_30p.png')})`,
    backgroundRepeat: 'repeat',
    backgroundColor: color('#3f46ad'),
    padding: '0 4vw'
  },
  bmCrossButton: {
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
    top: `${(MENU_HEIGHT - ICON_SIZE) / 2}px`,
    right: '4vw'
  },
  bmItemList: {
    display: 'flex',
    flexDirection: 'column'
  }
}
