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
    ({
      minimizeSidebar,
      maximizeSidebar,
      isLayoutClosed
    }) => {
      if (isLayoutClosed) {
        return '0px'
      } else {
        return (
          minimizeSidebar ? '40px' : '280px'
        )
      }
    }
  };
  min-width: 320px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 1fr;
  height: 100%;
  position: relative;
  z-index: 0;
  @media (max-width: 599px) {
    margin-left: ${
      ({ maximizeSidebar }) => (
        maximizeSidebar ? '280px' : '0px'
      )
    }
  }
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
    { !isLayoutClosed && (
        minimizeSidebar ?
          <SidebarMini /> :
          <Sidebar />
    ) }
    <Surface
      minimizeSidebar={ minimizeSidebar}
      isLayoutClosed={ isLayoutClosed }
      maximizeSidebar={ maximizeSidebar }>
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
