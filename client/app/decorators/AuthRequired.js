import React from 'react'
import { connect } from 'react-redux'

import Redirect from 'components/Redirect'

console.log('x')

export default function(Component) {
  @connect(state => ({ unauthorized: !!(state.app.session && !state.app.session.verified) }))

  class AuthRequired extends React.Component {
    render() {
      const { unauthorized } = this.props

      console.log(unauthorized)

      return (
        unauthorized ?
          <Redirect path="/" /> :
          <Component { ...this.props } { ...this.state } />
      )
    }
  }

  return AuthRequired
}
