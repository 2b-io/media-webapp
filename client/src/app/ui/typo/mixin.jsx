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

export const font = ({ bold, size }) => css`
  font-size: ${ sizeToPixel(size) }px;
  line-height: ${ sizeToPixel(size) }px;
  ${ bold && `font-weight: bold;` }
`

export const lineHeight = ({ size }) => css`
  line-height: ${
    sizeToPixel(size) < 14 ? 24 : 40
  }px;
`

export const padding = css`
  ${
    ({ mostLeft }) => mostLeft && css`
      padding-left: 8px;
    `
  }

  ${
    ({ mostRight }) => mostRight && css`
      padding-right: 8px;
    `
  }
`

export const paragraph = css`
  padding-top: 8px;
  padding-bottom: 16px;
`
