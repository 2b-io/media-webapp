import color from 'color'
import { flex } from 'styles/flex'
import { fontStyle } from 'styles/global'

export const containerStyle = {
  ...fontStyle,
  // size
  minWidth: '320px',
  maxWidth: '420px',
  margin: 'auto',

  // center
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translateX(-50%) translateY(-50%)',

  // card
  borderRadius: '.25rem',
  border: `1px solid ${color('#e8e8e8')}`,
  padding: '2rem 2rem 1rem',
  backgroundColor: color('#ffffff')
}

export const formRowStyle = {
  margin: '0 0 1rem'
}
