import React from 'react'
import { connect } from 'react-redux'

import Redirect from 'components/Redirect'

export default function(Component) {
  @connect(state => ({ unauthorized: !!(state.domain.session && !state.domain.session.verified) }))

  class AuthRequired extends React.Component {
    render() {
      const { unauthorized } = this.props

      return (
        unauthorized ?
          <Redirect path="/" /> :
          <Component { ...this.props } { ...this.state } />
      )
    }
  }

  return AuthRequired
}
