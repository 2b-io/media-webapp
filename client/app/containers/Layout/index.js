import React from 'react'
import { Route } from 'react-router'

import { loadableContainer } from 'helpers/loadable'

import Header from './Header'

let Home = loadableContainer('Home')
let Profile = loadableContainer('Profile')
let SignIn = loadableContainer('Auth/SignIn')

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route path="/profile" component={Profile} />
      </div>
    )
  }
}

export default Layout
