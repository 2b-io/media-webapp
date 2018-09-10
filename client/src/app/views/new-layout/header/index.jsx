import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'

import { MenuIcon } from 'ui/icons'

const Material = styled.section`
  height: 40px;
`

const Content = styled.div`
  display: grid;
  background: #07f;
  color: #fff;
  grid-template-columns: 40px 1fr 40px;
  height: 40px;
  justify-contents: center;
  align-items: center;

  & h1 {
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }
`

const Header = ({ children, maximizeSidebar }) => (
  <Material>
    <Content>
      <MenuIcon onClick={ maximizeSidebar } />
      { children }
    </Content>
  </Material>
)

export default connect(
  null,
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar
  })
)(Header)
