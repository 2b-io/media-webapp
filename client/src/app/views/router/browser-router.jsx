import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router'

export default ({ history, routes, otherwise: Otherwise }) => (
  <Router history={history}>
    <Switch>
      { routes.map(route => <Route {...route} key={route.path} />) }
      <Otherwise />
    </Switch>
  </Router>
)
