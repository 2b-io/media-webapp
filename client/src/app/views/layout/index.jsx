import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import Content from './content'
import Layer from './layer'
import Overlay from './overlay'
import Still from './still'
import Toast from './toast'
import Wrapper from './wrapper'

export { default as LeftMenu } from './left-menu'

export default ({
  isLayoutClosed
}) => {
  return (
    <Fragment>
      <div>
        { isLayoutClosed ? 'true' : 'false' }
      </div>
      <div>
      </div>
    </Fragment>
  )
}

class Layout extends Component {
  render() {
    const {
      isBackground,
      isLayoutClosed,
      email,
      maximizeSidebar,
      minimizeSidebar,
      menuWidth,
      render,
      sidebarMaximized,
      stillHeight,
      toProfile
    } = this.props

    return (
      <Fragment>
        <Layer isBackground={ isBackground }>
          <Overlay
            shown={ isLayoutClosed }
            width={ menuWidth }
            email={ email }
            toProfile={ toProfile }
            sidebarMaximized={ sidebarMaximized }
            toggleSidebar={ sidebarMaximized ? minimizeSidebar : maximizeSidebar }
          >
            { render.overlay(this.props) }
          </Overlay>
          <Wrapper
            shown={ !isLayoutClosed }
            menuWidth={ menuWidth }>
            <Still
              shown={ !isLayoutClosed }
              onComponentDidMount={ this.updateStillHeight() }
            >
              { render.still(this.props) }
            </Still>
            <Content
              shown={ !isLayoutClosed }
              stillHeight={ stillHeight }>
              { render.content(this.props) }
            </Content>
          </Wrapper>
        </Layer>
        <Toast />
      </Fragment>
    )
  }

  updateStillHeight() {
    const { updateStillHeight } = this.props

    return element => {
      updateStillHeight(element.clientHeight)
    }
  }
}

connect(
  state => {
    const session = selectors.currentSession(state)

    return {
      email: session && session.account.email,
      isBackground: selectors.hasShownModals(state),
      isLayoutClosed: selectors.isLayoutClosed(state),
      menuWidth: selectors.menuWidth(state),
      sidebarMaximized: selectors.sidebarMaximized(state),
      stillHeight: selectors.stillHeight(state)
    }
  },
  mapDispatch({
    maximizeSidebar: actions.maximizeSidebar,
    minimizeSidebar: actions.minimizeSidebar,
    toProfile: () => actions.requestLocation('/@me'),
    updateStillHeight: actions.updateStillHeight
  })
)(Layout)
