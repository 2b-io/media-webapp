import color from 'color'
import { fontStyle } from 'styles/global'

const MENU_HEIGHT = 70
const ICON_SIZE = 24

export const sideMenuStyle = {
  bmMenu: {
    ...fontStyle,
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

export const topStyle = {
  borderBottom: `1px solid ${color('#ffffff').fade(0.9)}`,
  margin: '0 -4vw',
  height: `${MENU_HEIGHT}px`,
  minHeight: `${MENU_HEIGHT}px`
}

export const contentStyle = {
  paddingTop: '1rem',
  flexGrow: 1
}

export const bottomStyle = {
  textAlign: 'center',
  padding: '1rem'
}

export const linkStyle = {
  color: color('#ffffff')
}

export const drawerItemStyle = {
  color: color('#ffffff'),
  fontSize: '1.5rem',
  display: 'block',
  padding: '1rem'
}