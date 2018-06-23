import styled from 'styled-components'

const Button = styled.button.attrs({
  type: ({ type = 'button' }) => type
})`
  appearance: none;
  border: 1px solid #333;
  padding: 0 15px;
  line-height: 2.5em;
  border-radius: 5px;
  cursor: pointer;
  background: white;
  transition: background .6s linear;

  &:hover {
    background: #ccc;
  }

  &:focus {
    outline: none;
  }
`

export default Button
