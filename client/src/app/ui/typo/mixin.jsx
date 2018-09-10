import { css } from 'styled-components'

const sizeToPixel = (size = 'normal') => (
  size === 'large' ? 16 : (
    size === 'normal' ? 14 : (
      size === 'small' ? 12 : 10
    )
  )
)

export const textAlign = ({ align }) => css`
  text-align: ${ align };
`

export const font = ({ size }) => css`
  font-size: ${ sizeToPixel(size) }px;
  line-height: ${ sizeToPixel(size) }px;
`

export const lineHeight = ({ size }) => css`
  line-height: ${
    sizeToPixel(size) < 14 ? 16 : 40
  }px;
`

export const paragraph = css`
  padding-top: 8px;
  padding-bottom: 16px;
`
