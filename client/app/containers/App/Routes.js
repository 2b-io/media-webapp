import React from 'react'
import { Route, Switch } from 'react-router'

import { loadableContainer } from 'helpers/loadable'

class Routes extends React.Component {
  constructor(props) {
    super(props)

    this.screens = {
      dashboard: loadableContainer('Dashboard', '/dashboard'),
      home: loadableContainer('Home', '/'),
      profile: loadableContainer('Profile', '/profile', false),
      projectCreate: loadableContainer('Project', '/projects/:action'),
      projectView: loadableContainer('Project', '/projects/:action/:slug'),
      signIn: loadableContainer('SignIn', '/sign-in'),
      signUp: loadableContainer('SignUp', '/sign-up')
    }
  }

  render() {
    return this._renderRoutes(this.screens)
  }

  _renderRoutes(screens) {
    return Object.keys(screens).map(key => {
      const Component = screens[key]

      return <Component key={key} />
    })
  }
}

export default Routes
