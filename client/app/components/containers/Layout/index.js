import React from 'react'
import { Route } from 'react-router'

import { loadableContainer } from 'helpers/loadable'

let Home = loadableContainer('Home')
let Profile = loadableContainer('Profile')
let SignIn = loadableContainer('Auth/SignIn')

class Layout extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route path="/profile" component={Profile} />
      </div>
    )
  }
}

export default Layout
