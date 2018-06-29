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
export { default as TopMenu } from './top-menu'

class Layout extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      headerHeight: 0,
      stillHeight: 0
    }
  }

  render() {
    const {
      isBackground,
      isLayoutClosed,
      menuWidth,
      headerHeight,
      render,
      email,
      toProfile
    } = this.props

    return (
      <Layer isBackground={ isBackground }>
        <Overlay
          shown={ isLayoutClosed }
          headerHeight={ headerHeight }
          width={ menuWidth }
          email={ email }
          toProfile={ toProfile }>
          { render.overlay(this.props) }
        </Overlay>
        <Wrapper
          shown={ !isLayoutClosed }
          headerHeight={ headerHeight }
          menuWidth={ menuWidth }>
          <Still
            shown={ !isLayoutClosed }
            onComponentDidMount={ this.updateStillHeight() }>
            { render.still(this.props) }
          </Still>
          <Content
            shown={ !isLayoutClosed }
            stillHeight={ this.state.stillHeight }>
            { render.content(this.props) }
          </Content>
        </Wrapper>
      </Layer>
    )
  }

  updateStillHeight() {
    return element => {
      if (this.state.stillHeight === element.clientHeight) {
        return
      }

      this.setState({
        stillHeight: element.clientHeight
      })
    }
  }
}

export default connect(
  state => {
    const session = selectors.currentSession(state)

    return {
      email: session && session.account.email,
      isLayoutClosed: selectors.isLayoutClosed(state),
      isBackground: Object.values(state.modal).some(Boolean)
    }
  },
  mapDispatch({
    toProfile: () => actions.requestLocation('/@me')
  })
)(Layout)
