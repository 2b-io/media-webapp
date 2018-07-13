import React, { Component } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'

import Content from './content'
import Layer from './layer'
import Overlay from './overlay'
import Still from './still'
import Wrapper from './wrapper'

export { default as LeftMenu } from './left-menu'

class Layout extends Component {
  render() {
    const {
      isBackground,
      isLayoutClosed,
      email,
      menuWidth,
      render,
      stillHeight,
      toProfile
    } = this.props

    return (
      <Layer isBackground={ isBackground }>
        <Overlay
          shown={ isLayoutClosed }
          width={ menuWidth }
          email={ email }
          toProfile={ toProfile }>
          { render.overlay(this.props) }
        </Overlay>
        <Wrapper
          shown={ !isLayoutClosed }
          menuWidth={ menuWidth }>
          <Still
            shown={ !isLayoutClosed }
            onComponentDidMount={ this.updateStillHeight() }>
            { render.still(this.props) }
          </Still>
          <Content
            shown={ !isLayoutClosed }
            stillHeight={ stillHeight }>
            { render.content(this.props) }
          </Content>
        </Wrapper>
      </Layer>
    )
  }

  updateStillHeight() {
    const { updateStillHeight } = this.props

    return element => {
      updateStillHeight(element.clientHeight)
    }
  }
}

export default connect(
  state => {
    const session = selectors.currentSession(state)

    return {
      email: session && session.account.email,
      isLayoutClosed: selectors.isLayoutClosed(state),
      isBackground: Object.values(state.modal).some(Boolean),
      stillHeight: selectors.stillHeight(state)
    }
  },
  mapDispatch({
    toProfile: () => actions.requestLocation('/@me'),
    updateStillHeight: actions.updateStillHeight
  })
)(Layout)
