import React, { Component } from 'react'
import { Router as BrowserRouter, Route, Switch } from 'react-router'

const renderRoutes = routes => routes.map(route => (
  <Route {...route} key={route.path} />
))

const Router = ({
  animation: Animation,
  history,
  routes,
  otherwise: Otherwise
}) => (
  <BrowserRouter history={history}>
    { Animation &&
      (
        <Animation>
          <Switch>
            { renderRoutes(routes) }
            <Otherwise />
          </Switch>
        </Animation>
      ) ||
      (
        <Switch>
          { renderRoutes(routes) }
          <Otherwise />
        </Switch>
      )
    }
  </BrowserRouter>
)

export default Router
