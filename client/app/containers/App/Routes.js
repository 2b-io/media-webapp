import React from 'react'
import { Route } from 'react-router'

import { loadableContainer } from 'helpers/loadable'

class Routes extends React.Component {
  constructor(props) {
    super(props)

    this.screens = {
      dashboard: loadableContainer('Dashboard', '/dashboard'),
      home: loadableContainer('Home', '/'),
      profile: loadableContainer('Profile', '/profile', false),
      project: loadableContainer('Project', '/projects/:action/:slug?'),
      signIn: loadableContainer('SignIn', '/sign-in'),
      signUp: loadableContainer('SignUp', '/sign-up')
    }
  }

  render() {
    return Object.keys(this.screens).map(key => {
      const Component = this.screens[key]

      return <Component key={key} />
    })
  }
}

export default Routes
