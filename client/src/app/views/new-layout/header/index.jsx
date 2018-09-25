import React from 'react'
import styled from 'styled-components'

const Material = styled.section`
  height: 40px;
`

const Content = styled.div`
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
  height: 40px;
  justify-contents: center;
  align-items: center;
`

const Header = ({ children }) => (
  <Material>
    <Content>
      { children }
    </Content>
  </Material>
)

export default Header
