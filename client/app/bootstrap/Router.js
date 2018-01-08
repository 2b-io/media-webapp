import React from 'react'
import { connect } from 'react-redux'
import { Router as BrowserRouter } from 'react-router'

class Router extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { component: Component, history } = this.props

    return (
      <BrowserRouter history={history}>
        <Component {...this.props} />
      </BrowserRouter>
    )
  }
}

export default Router
