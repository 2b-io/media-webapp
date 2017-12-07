import React from 'react'
import { connect } from 'react-redux'

import Redirect from 'components/Redirect'

export default function(Component) {

  @connect(state => ({ authorized: !!(state.session && state.session.verified) }))
  class UnauthRequired extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      const { authorized } = this.props

      return (
        authorized ?
          <Redirect path="/dashboard" /> :
          <Component { ...this.props } { ...this.state } />
      )
    }
  }

  return UnauthRequired
}
