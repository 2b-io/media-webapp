import React from 'react'
import { Router as BrowserRouter } from 'react-router'

class Router extends React.PureComponent {
  render() {
    let { history, component: Component } = this.props

    return (
      <BrowserRouter history={history}>
        <Component />
      </BrowserRouter>
    )
  }
}

export default Router
