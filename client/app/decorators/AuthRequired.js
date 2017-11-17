import React from 'react'
import { connect } from 'react-redux'

import Redirect from 'components/core/Redirect'

export default function(Component) {

  @connect(state => ({ unauthorized: state.error.unauthorized }))
  class AuthRequired extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      const { unauthorized, dispatch } = this.props

      if (unauthorized) {
        return <Redirect path="/sign-in" />
      }

      return <Component { ...this.props } { ...this.state } />
    }
  }

  return AuthRequired
}
