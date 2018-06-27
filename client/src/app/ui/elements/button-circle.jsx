import React from 'react'
import styled, { css }from 'styled-components'

const ButtonCircle = styled.div.attrs({
  type: ({ type = 'button' }) => type
})`
  & {
    border-radius: 32px;
    background-color: #333333;
    cursor: pointer;
    overflow: hidden;
    ${
      ({ size }) => {
        switch (size) {
          case 'extraLarge':
            return css`
              width: 48px;
              height: 48px;
            `
          case 'large':
            return css`
              width: 32px;
              height: 32px;
            `
          case 'medium':
            return css`
              width: 24px;
              height: 24px;
            `
          default:
            return css`
              width: 16px;
              height: 16px;
            `
        }
      }
    }
  }

  &:hover {
    background-color: #fa7584;
  }
`

export default ButtonCircle
