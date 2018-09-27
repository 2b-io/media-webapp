import styled from 'styled-components'

const Header = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }
  background: ${
    ({ theme }) => theme.primary.base
  };
  color: ${
    ({ theme }) => theme.primary.on.base
  };
  grid-template-columns: 40px 1fr 40px;
  justify-contents: center;
  align-items: flex-start;
`

export default Header
