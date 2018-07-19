import styled from 'styled-components'

const Title = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  text-transform: uppercase;
  line-height: 2.2em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  & > * {
    display: inline-block;
  }
`

export default Title
