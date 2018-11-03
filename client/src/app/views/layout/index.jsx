import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectors } from 'state/interface'
import { Break } from 'ui/elements'

import Body from './body'
import Header from './header'
import Logo from './logo'
import Sidebar from './sidebar'
import SidebarMini from './sidebar-mini'

import Toast from './toast'

const Surface = styled.main`
  margin-left: ${
    ({ minimizeSidebar }) => (
      minimizeSidebar ? '40px' : '280px'
    )
  };
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 1fr;
  height: 100%;
  position: relative;
  z-index: 0;
`

const LogoWrapper = styled.div`
  padding-top: 96px;
  text-align: center;
`

const Layout = ({
  isLayoutClosed,
  minimizeSidebar,
  maximizeSidebar,
  render,
  ...props
}) => (
  <Fragment>
    { minimizeSidebar && <SidebarMini /> }
    { maximizeSidebar && <Sidebar /> }
    <Surface minimizeSidebar={ minimizeSidebar }>
      <Header className='header'>
        { render.still(props) }
      </Header>
      <Body className='body'>
        { isLayoutClosed &&
          <Fragment>
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
            <Break />
            { render.overlay(props) }
          </Fragment> ||
          render.content(props)
        }
      </Body>
    </Surface>
    <Toast />
  </Fragment>
)

export default connect(
  state => ({
    minimizeSidebar: selectors.minimizeSidebar(state),
    maximizeSidebar: selectors.maximizeSidebar(state),
    isLayoutClosed: selectors.isLayoutClosed(state)
  })
)(Layout)
