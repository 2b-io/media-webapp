import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'

const renderRoutes = routes => routes.map(route => (
  <Route {...route} key={route.path} />
))

export default ({ history, routes, otherwise: Otherwise }) => (
  <Router history={history}>
    <Switch>
      { renderRoutes(routes) }
      <Otherwise />
    </Switch>
  </Router>
)
