import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectors } from 'state/interface'
import { Break } from 'ui/elements'

import Body from './body'
import Header from './header'
import Logo from './logo'
import Sidebar from './sidebar'

import Toast from './toast'

const easingFunc = 'cubic-bezier(.4, 0, .2, 1)'

const Surface = styled.main`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 1fr;
  height: 100%;
  position: relative;
  z-index: 0;
  transition:
    transform .3s ${ easingFunc },
    margin-left .3s ${ easingFunc };

  margin-left: 0;
  transform: ${
    ({ isLayoutClosed, maximizeSidebar }) => maximizeSidebar ?
      'translateX(280px)' :
      'translateX(0)'
  };

  @media (min-width: 600px) {
    margin-left: ${
      ({ isLayoutClosed }) => isLayoutClosed ? '0' : '40px'
    };

    transform: ${
      ({ isLayoutClosed, maximizeSidebar }) => maximizeSidebar ?
        'translateX(240px)' :
        'translateX(0)'
    };
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
    { !isLayoutClosed && <Sidebar /> }
    <Surface
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
