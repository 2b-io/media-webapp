import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  cursor: pointer;
  display: inline-flex;

  &:focus {
    outline: none;
  }

  ${
    ({ plain }) => plain ?
      css`
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
      ` :
      css`
        border: 1px solid #333;
        padding: 0 15px;
        line-height: 2.5em;
        border-radius: 5px;
        background: white;
        transition: background .6s linear;

        &:hover {
          background: #ccc;
        }
      `
  }
`

export default Button
