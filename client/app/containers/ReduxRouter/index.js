import React from 'react'
import { Router } from 'react-router'

class ReduxRouter extends React.Component {
  render() {
    const { children, history } = this.props

    return (
      <Router history={history}>
        {children}
      </Router>
    )
  }
}

export default ReduxRouter
