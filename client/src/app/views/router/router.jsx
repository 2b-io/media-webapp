import React, { Component } from 'react'
import { Router as BrowserRouter, Route, Switch } from 'react-router'

const renderRoutes = routes => routes.map(route => (
  <Route {...route} key={route.path} />
))

const Router = ({ history, routes, otherwise: Otherwise }) => (
  <BrowserRouter history={history}>
    <Switch>
      { renderRoutes(routes) }
      <Otherwise />
    </Switch>
  </BrowserRouter>
)

export default Router
