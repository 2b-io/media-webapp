import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { selectors } from 'state/interface'

import Router from 'views/router'

@connect(state => ({
  isSignedIn: selectors.isSignedIn(state)
}))
export default class Layout extends Component {
  render() {
    const { isSignedIn } = this.props

    return (
      <Fragment>
        <h1>{ isSignedIn.toString() }</h1>
        <Router />
      </Fragment>

    )
  }
}
