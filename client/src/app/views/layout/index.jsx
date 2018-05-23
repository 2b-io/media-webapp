import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectors } from 'state/interface'

@connect(state => ({
  isSignedIn: selectors.isSignedIn(state)
}))
export default class Layout extends Component {
  render() {
    const { isSignedIn } = this.props

    return (
      <h1>{ isSignedIn.toString() }</h1>
    )
  }
}
