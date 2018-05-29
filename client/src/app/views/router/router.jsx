import React, { Component } from 'react'
import { Router as BrowserRouter, Route, Switch, withRouter } from 'react-router'

import { AnimatedSwitch } from 'react-router-transition'

const renderRoutes = routes => routes.map(
  route => <Route {...route} key={route.path} />
)

const Router = ({
  history,
  routes,
  otherwise: Otherwise
}) => {
  return (
    <BrowserRouter history={ history }>
      <AnimatedSwitch
        atEnter={ { opacity: 0 } }
        atLeave={ { opacity: 0 } }
        atActive={ { opacity: 1 } }
        className="switch-wrapper">
        { renderRoutes(routes) }
        <Otherwise />
      </AnimatedSwitch>
    </BrowserRouter>
  )
}

export default Router
