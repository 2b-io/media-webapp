import React, { Fragment } from 'react'
import styled from 'styled-components'

import { MenuIcon } from 'ui/icons'

const Material = styled.section`
  height: 32px;
`

const Content = styled.div`
  display: grid;
  background: #07f;
  color: #fff;
  grid-template-columns: 32px 1fr 32px;
  height: 32px;
  justify-contents: center;
  align-items: center;
`

const Header = ({ children }) => (
  <Material>
    <Content>
      <MenuIcon />
      { children }
    </Content>
  </Material>
)

export default Header
