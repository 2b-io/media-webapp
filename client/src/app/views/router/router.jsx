import React, { Component } from 'react'
import {
  Router as BrowserRouter,
  Route
} from 'react-router'

import Switch from './switch'

const renderRoutes = routes => routes.map(
  route => (
    <Route { ...route } key={ route.path } />
  )
)

const Router = ({
  animated = false,
  history,
  routes,
  otherwise: Otherwise
}) => {
  return (
    <BrowserRouter history={ history }>
      <Switch animated={ animated }>
        { renderRoutes(routes) }
        { Otherwise && <Otherwise /> || null }
      </Switch>
    </BrowserRouter>
  )
}

export default Router
