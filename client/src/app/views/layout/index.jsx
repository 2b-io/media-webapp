import React, { Component } from 'react'
import { connect } from 'react-redux'
import selectors from 'state/selectors'

@connect(state => ({
  isSignedIn: selectors.session.isSignedIn(state)
}))
export default class Layout extends Component {
  render() {
    const { isSignedIn } = this.props

    console.log(isSignedIn)

    return (
      <h1>{ isSignedIn.toString() }</h1>
    )
  }
}
