import styled from 'styled-components'

const TextArea = styled.textarea.attrs({
  type: ({ type = 'text' }) => type
})`
  appearance: none;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid lightgray;
  border-radius: 0;
  outline: none;
  padding: 10px;
  width: 100%;
  resize: none;
  transition: border-bottom .6s linear;
  &:hover, &:focus {
    border-bottom: 2px solid black;
  }
`

export default TextArea
