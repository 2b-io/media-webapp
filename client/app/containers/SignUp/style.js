import color from 'color'
import prefix from 'helpers/prefix'
import { fontStyle } from 'styles/global'
import { cardLayout } from 'styles/layout'

export const container = prefix({
  ...cardLayout.wrapper
})

export const signUpContainer = prefix({
  ...fontStyle,
  ...cardLayout.content,
  // size
  maxWidth: '480px',
  backgroundColor: color('#ffffff'),
  border: `1px solid ${color('#e8e8e8')}`,
})

export const formRowStyle = prefix({
  margin: '0 0 1rem'
})
