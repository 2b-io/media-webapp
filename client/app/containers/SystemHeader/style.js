import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import { fontStyle } from 'styles/global'

const MENU_HEIGHT = 70

export default prefix({
  wrapper: {
    ...fontStyle,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  container: {
    padding: '0 4vw',
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },
  menuIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: '10px 10px 0 0',
    background: COLOR.dark,
    borderRadius: '100%',
    width: '34px',
    height: '34px',
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 201
  },
  logoIcon: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '10px 0 0 10px',
    width: '34px',
    height: '34px',
    border: `2px solid ${COLOR.dark}`,
    borderRadius: '100%',
    outline: 'none',
    zIndex: 201
  }
})
