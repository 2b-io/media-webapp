import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { selectors } from 'state/interface'

import Router from 'views/router'

import Header from './header'
import Overlay from './overlay'
import Wrapper from './wrapper'

@connect(state => ({
  isSignedIn: selectors.isSignedIn(state)
}))
export default class Layout extends Component {
  constructor(...args) {
    super(...args)

    this.state = { headerHeight: 0 }
  }

  render() {
    const { isSignedIn } = this.props

    return (
      <Fragment>
        <Header
          shown={ isSignedIn }
          onComponentDidMount={ this.updateHeaderHeight() }
        />
        <Overlay
          shown={ !isSignedIn }
          headerHeight={ this.state.headerHeight }
        />
        <Wrapper
          shown={ isSignedIn }
          headerHeight={ this.state.headerHeight }
        />
      </Fragment>
    )
  }

  updateHeaderHeight() {
    return element => this.setState({
      headerHeight: element.clientHeight
    })
  }
}
