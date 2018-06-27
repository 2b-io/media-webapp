import PropTypes from 'prop-types'
import React from 'react'
import styled, { css }from 'styled-components'

const ButtonCircle = styled.div.attrs({
  type: ({ type = 'button' }) => type
})`
  & {
    border-radius: 100%;
    background-color: ${ ( {color='#333333'} ) => color };
    cursor: pointer;
    overflow: hidden;
    margin: ${ ({ margin }) => margin };
    float: ${ ({ float }) => float };
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
ButtonCircle.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf([ 'extraLarge', 'large', 'medium' ]),
  float: PropTypes.oneOf([ 'left', 'right', 'unset', 'none' ]),
  margin: PropTypes.string
}
export default ButtonCircle
