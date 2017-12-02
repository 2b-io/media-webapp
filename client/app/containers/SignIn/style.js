import color from 'color'

import { fontStyle } from 'styles/global'
import { cardLayout } from 'styles/layout'

export const wrapperStyle = {
  ...cardLayout.wrapper
}

export const containerStyle = {
  ...fontStyle,
  ...cardLayout.content,
  // size
  minWidth: '320px',
  maxWidth: '420px',
}

export const formRowStyle = {
  margin: '0 0 1rem'
}
