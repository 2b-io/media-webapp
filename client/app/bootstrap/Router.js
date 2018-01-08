import React from 'react'
import { Router as BrowserRouter } from 'react-router'
import history from './history'

class Router extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { component: Component } = this.props

    return (
      <BrowserRouter history={history}>
        <Component {...this.props} />
      </BrowserRouter>
    )
  }
}

export default Router
