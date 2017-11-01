import React from 'react';
import { Router } from 'react-router'
import { renderRoutes } from 'react-router-config';

import history from 'core/history'
import { routes } from 'core/routing';

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        {renderRoutes(routes)}
      </Router>
    )
  }
}

export default AppRouter
