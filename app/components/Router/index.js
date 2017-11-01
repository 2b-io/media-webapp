import React from 'react'
import { Router as BrowserRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'

class Router extends React.Component {
  render() {
    let { history, routes } = this.props

    return (
      <BrowserRouter history={history}>
        {renderRoutes(routes)}
      </BrowserRouter>
    )
  }
}

export default Router
