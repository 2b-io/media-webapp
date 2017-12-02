import color from 'color'

import { fontStyle } from 'styles/global'
import { cardLayout } from 'styles/layout'

export const container = {
  ...cardLayout.wrapper
}

export const signInContainer = {
  ...fontStyle,
  ...cardLayout.content,
  // size
  minWidth: '320px',
  maxWidth: '480px',

  backgroundColor: color('#ffffff'),
  border: `1px solid ${color('#e8e8e8')}`,
}

export const signUpPromotion = {
  ...fontStyle,
  ...cardLayout.content,
  // size
  minWidth: '320px',
  maxWidth: '480px',
  textAlign: 'center'
}

export const formRowStyle = {
  margin: '0 0 1rem'
}
