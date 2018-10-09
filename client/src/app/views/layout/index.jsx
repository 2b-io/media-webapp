import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectors } from 'state/interface'
import { Break } from 'ui/elements'

import Body from './body'
import Header from './header'
import Logo from './logo'
import Sidebar from './sidebar'

import Toast from './toast/'

const Surface = styled.main`
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

const Layout = ({ isLayoutClosed, render, ...props }) => (
  <Fragment>
    <Surface>
      { !isLayoutClosed && (
        <Header className="header">
          { render.still(props) }
        </Header>
      ) }
      <Body className="body">
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
    { !isLayoutClosed && <Sidebar /> }
    <Toast />
  </Fragment>
)

export default connect(
  state => ({
    isLayoutClosed: selectors.isLayoutClosed(state)
  })
)(Layout)
