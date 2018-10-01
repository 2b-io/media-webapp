import React from 'react'
import {
  Router as BrowserRouter,
  Route
} from 'react-router'

import Switch from './switch'

const renderRoutes = (routes, props) => routes.map(
  ({ component: Component, ...route }) => (
    <Route
      { ...route }
      key={ route.path }
      render={ (ownProps) => (
        <Component
          { ...props }
          { ...ownProps }
        />
      ) }
    />
  )
)

const Router = ({
  animated = false,
  history,
  routes,
  otherwise: Otherwise,
  ...props
}) => {
  return (
    <BrowserRouter history={ history }>
      <Switch animated={ animated }>
        { renderRoutes(routes, props) }
        { Otherwise && <Otherwise /> || null }
      </Switch>
    </BrowserRouter>
  )
}

export default Router
