import styled from 'styled-components'

const Menu = styled.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  white-space: nowrap;

  & > *:not(:last-child) {
    margin-right: ${
      ({ theme }) => theme.spacing.tiny
    }
  }
`

export default Menu
