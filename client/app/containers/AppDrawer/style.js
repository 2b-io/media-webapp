import color from 'color'

const MENU_HEIGHT = 70

export const sideMenuStyle = {
  bmMenu: {
    background: `url(${require('img/bg_halftone_black_30p.png')})`,
    backgroundRepeat: 'repeat',
    backgroundColor: color('#3f46ad'),
    padding: '0 4vw'
  },
  bmCrossButton: {
    width: '32px',
    height: '32px',
    top: `${(MENU_HEIGHT - 32) / 2}px`,
    right: '4vw'
  }
}

export const topStyle = {
  borderBottom: `1px solid ${color('#ffffff').fade(0.9)}`,
  margin: '0 -4vw',
  height: `${MENU_HEIGHT}px`
}

export const contentStyle = {
  paddingTop: '1rem'
}

export const drawerItemStyle = {
  color: color('#ffffff'),
  fontSize: '1.5rem',
  display: 'block',
  padding: '1rem'
}
